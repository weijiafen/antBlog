var async = require('asyncawait/async');
var await = require('asyncawait/await');

var competitions = require('../../modules/resume/competitions');
var competitions_item=require('../../modules/resume/competitions_item');
module.exports=(async (function(method,req,response){
	var result;
	var uid=req.session.uid;
	if(method==='get'){
		var res=await(competitions.findOne({
			where:{
				userId:uid
			}
		}))
		var competitionId=res.id;
		var items=await(competitions_item.findAll({
			where:{
				competitionId:competitionId
			}
		}))
		var data=[]
		items.forEach(function(item,index){
			data.push({
				id:item.dataValues.id,
				itemImg:item.dataValues.itemImg,
				itemDate:item.dataValues.itemDate,
				itemTxt:item.dataValues.itemTxt
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
		var res=await(competitions.update({
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
			if(item.id!==0){
				//更新一个项目
				await(competitions_item.update({
					itemImg:item.itemImg,
					itemDate:item.itemDate,
					itemTxt:item.itemTxt,
				},{
					where:{
						id:item.id
					}
				}))
			}else{
				//新增一个项目
				var p_item=await(competitions_item.create({
					competitionId:req.body.id,
					itemImg:item.itemImg,
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