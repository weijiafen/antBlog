var async = require('asyncawait/async');
var await = require('asyncawait/await');

var library = require('../../modules/resume/library');
var library_item=require('../../modules/resume/library_item');
module.exports=(async (function(method,req,response){
	var result;
	var uid=req.session.uid;
	if(method==='get'){
		var res=await(library.findOne({
			where:{
				userId:uid
			}
		}))
		var libraryId=res.id;
		var items=await(library_item.findAll({
			where:{
				libraryId:libraryId
			}
		}))
		var data=[]
		items.forEach(function(item,index){
			data.push({
				id:item.dataValues.id,
				itemImg:item.dataValues.itemImg,
				itemTitle:item.dataValues.itemTitle,
				itemSum:item.dataValues.itemSum,
				itemCurrent:item.dataValues.itemCurrent,
			})
		})
		result={status:0,data:{
			id:res.id,
			backgroundImg:res.background_img,
			isShow:res.isShow,
			title:res.title,
			color:res.color,
			data:data
		}};
	}
	else if(method==='post'){
		//先更新项目经验表
		var res=await(library.update({
			color:req.body.color,
			isShow:req.body.isShow,
			title:req.body.title,
			background_img:req.body.backgroundImg,
			color:req.body.color
		},{
			where:{
				userId:uid
			}
		}))
		//更新项目数据表
		for(var item of req.body.data){
			if(item.itemCurrent>item.itemSum){
				item.itemCurrent=item.itemSum;
			}
			if(item.id!==0){
				//更新一个项目
				await(library_item.update({
					itemImg:item.itemImg,
					itemTitle:item.itemTitle,
					itemSum:item.itemSum,
					itemCurrent:item.itemCurrent
				},{
					where:{
						id:item.id
					}
				}))
			}else{
				//新增一个项目
				var p_item=await(library_item.create({
					libraryId:req.body.id,
					itemImg:item.itemImg,
					itemTitle:item.itemTitle,
					itemSum:item.itemSum,
					itemCurrent:item.itemCurrent
				}))
			}
		}
		
		result={status:0,msg:'保存成功'};
	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))