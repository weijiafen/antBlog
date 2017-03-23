var async = require('asyncawait/async');
var await = require('asyncawait/await');

var work_exp = require('../../modules/resume/work_exp');
var work_item=require('../../modules/resume/work_item');
module.exports=(async (function(method,req,response){
	var result;
	var uid=req.session.uid;
	if(method==='get'){
		var res=await(work_exp.findOne({
			where:{
				userId:uid
			}
		}))
		var workId=res.id;
		var items=await(work_item.findAll({
			where:{
				workId:workId
			}
		}))
		var data=[]
		items.forEach(function(item,index){
			data.push({
				id:item.dataValues.id,
				itemTitle:item.dataValues.itemTitle,
				itemDate:item.dataValues.itemDate,
				itemTxt:item.dataValues.itemTxt
			})
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
		var res=await(work_exp.update({
			isShow:req.body.isShow,
			title:req.body.title,
			background_img:req.body.backgroundImg
		},{
			where:{
				userId:uid
			}
		}))
		//更新项目数据表
		for(var item of req.body.data){
			if(item.id!==0){
				//更新一个项目
				await(work_item.update({
					itemTitle:item.itemTitle,
					itemDate:item.itemDate,
					itemTxt:item.itemTxt,
				},{
					where:{
						id:item.id
					}
				}))
			}else{
				//新增一个项目
				var p_item=await(work_item.create({
					workId:req.body.id,
					itemTitle:item.itemTitle,
					itemDate:item.itemDate,
					itemTxt:item.itemTxt
				}))
			}
		}
		
		result={status:0,msg:'保存成功'};
	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))