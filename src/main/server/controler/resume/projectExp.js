var async = require('asyncawait/async');
var await = require('asyncawait/await');

var project_exp = require('../../modules/resume/project_exp');
var project_item=require('../../modules/resume/project_item');
var project_item_des=require('../../modules/resume/project_item_des');
module.exports=(async (function(method,req,response){
	var result;
	var uid=req.session.uid;
	if(method==='get'){
		var res=await(project_exp.findOne({
			where:{
				userId:uid
			}
		}))
		var projectId=res.id;
		var items=await(project_item.findAll({
			where:{
				projectId:projectId
			}
		}))
		var data=[]
		items.forEach(function(item,index){
			data.push({
				id:item.dataValues.id,
				itemTitle:item.dataValues.itemTitle
			})
			var descriptions=await(project_item_des.findAll({
				where:{
					itemId:item.dataValues.id
				}
			}))
			data[index].descriptions=[];
			for(description of descriptions){
				data[index].descriptions.push({
					id:description.dataValues.id,
					key:description.dataValues.key,
					value:description.dataValues.value
				})
			}
		})
		result={status:0,data:{
			id:res.id,
			backgroundImg:res.background_img,
			isShow:res.isShow,
			title:res.title,
			data:data
		}};
	}
	else if(method==='post'){
		//先更新项目经验表
		var res=await(project_exp.update({
			isShow:req.body.isShow,
			title:req.body.title,
			background_img:req.body.backgroundImg
		},{
			where:{
				userId:uid
			}
		}))
		//更新项目数据表
		var data=[];
		for(var item of req.body.data){
			if(item.id!==0){
				//更新一个项目
				await(project_item.update({
					itemTitle:item.itemTitle
				},{
					where:{
						id:item.id
					}
				}))
				for(var des of item.descriptions){
					if(des.id===0){
						await(project_item_des.create({
							key:des.key,
							value:des.value,
							itemId:item.id
						}))
					}else{
						await(project_item_des.update({
							key:des.key,
							value:des.value
						},{
							where:{
								id:des.id
							}
						}))
					}
					
				}
			}else{
				//新增一个项目
				var p_item=await(project_item.create({
					itemTitle:item.itemTitle,
					projectId:req.body.id
				}))
				for(var des of item.descriptions){
					await(project_item_des.create({
						key:des.key,
						value:des.value,
						itemId:p_item.dataValues.id
					}))
				}
			}
		}
		
		result={status:0,msg:'保存成功'};
	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))