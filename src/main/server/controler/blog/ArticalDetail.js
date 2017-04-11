var artical=require('../../modules/blog/artical');
var agree=require('../../modules/blog/agree');
var comment=require('../../modules/blog/comment');
var User=require('../../modules/resume/user');
var category=require('../../modules/blog/category')
var notifyFans=require('../../controler/blog/notifyFans')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
module.exports=(async(function(method,req,res){
	var result;
	if(method==="get"){
		User.hasMany(artical);
		artical.belongsTo(User);
		var id=req.query.id
		var detail=await(artical.findOne({
			where:{
				id:id
			},
			include:[User]
		}))
		if(detail){
			//type:为1时表示来自博客前台的请求，执行增加阅读量的逻辑操作
			var type=req.query.type;
			var reading=detail.dataValues.reading+1;
			if(req.session.artical){
				//将文章id存入session中，没有读过该文章则给reading字段加1
				if(!req.session.artical[id]){
					req.session.artical[id]=id;
					artical.update({
						reading:reading
					},{
						where:{
							id:id
						}
					})
				}else{
					//已读则不做操作
				}
			}else{
				req.session.artical=[];
					artical.update({
						reading:reading
					},{
						where:{
							id:id
						}
					})
					req.session.artical[id]=id;
			}
			var categoryData=await(category.findOne({
				where:{
					id:detail.dataValues.categoryId
				}
			}))
			var agreeData=await(agree.findAndCountAll({
				where:{
					articalId:id
				}
			}))
			result={
				status:0,
				msg:'查询成功',
				data:{
					agree:agreeData.count,
					reading:detail.dataValues.reading,
					categoryId:detail.dataValues.categoryId,
					articalName:detail.dataValues.articalName,
					articalContent:detail.dataValues.articalContent,
					createAt:detail.dataValues.createAt,
					updateAt:detail.dataValues.updateAt,
					author:detail.dataValues.user.dataValues.userName,
					menuId:categoryData.dataValues.menuId,
					categoryName:categoryData.dataValues.categoryName
				}
			}
		}
		else{
			result={status:1,msg:"没有查到这篇文章"}
		}
		
	}
	else if(method==='post'){
		var uid=req.session.uid;
		var id=req.body.id;
		var categoryId=req.body.categoryId;
		var articalName=req.body.articalName;
		var articalContent=req.body.articalContent;
		var isNotifyFans=req.body.notifyFans
		if(id){
			var nowStamp=new Date().valueOf();
			var item=await(artical.update({
				categoryId:categoryId,
				articalName:articalName,
				articalContent:articalContent,
				updateAt:nowStamp
			},{
				where:{
					userId:uid,
					id:id
				}
			}))
			if(item){
				result={
					status:0,
					msg:"修改文章成功",
					data:{
						updateAt:nowStamp
					}
				}
			}
			if(isNotifyFans){
				notifyFans(2,uid,articalName)
			}
			
		}else{
			var nowStamp=new Date().valueOf();
			var item=await(artical.create({
				userId:uid,
				categoryId:categoryId,
				articalName:articalName,
				articalContent:articalContent,
				reading:0,
				createAt:nowStamp,
				updateAt:nowStamp
			}))
			if(item){
				result={
					status:0,
					msg:"新增文章成功",
					data:{
						createAt:nowStamp,
						updateAt:nowStamp,
						id:item.dataValues.id
					}
				}
			}
			if(isNotifyFans){
				notifyFans(1,uid,articalName)
			}
			
		}
	}
	else if(method==='delete'){
		var id=req.query.id
		var uid=req.session.uid;
		//删除该用户下的articalId文章
		var deleteArt=await(artical.destroy({
			where:{
				id:id,
				userId:uid
			}
		}))
		if(deleteArt){
			result={
				status:0,
				msg:"删除成功"
			}
		}else{
			result={
				status:-1,
				msg:"删除失败"
			}
		}
	}else{
		result={status:1,msg:"系统异常"}
	}
	res.writeHead(200,{'Content-Type':'text/json;charset=utf-8'})
	res.end(JSON.stringify(result))
}))