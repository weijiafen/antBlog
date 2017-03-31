var agree=require('../../modules/blog/agree');
var artical=require('../../modules/blog/artical')
var User=require('../../modules/resume/user')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
module.exports=(async(function(req,res){
	var result;
	var articalId=req.body.articalId;
	var uid=req.session.uid;
	var isAgreed=await(agree.findOne({
		where:{
			userId:uid,
			articalId:articalId
		}
	}))
	if(isAgreed){
		result={
			status:-1,
			msg:"你已经给这篇文章点过赞了哦"
		}
	}else{
		var author=await(artical.findOne({
				where:{
					id:articalId
				},
				attributes:['userId']
			}))
		var agreeData=await(agree.create({
			articalId:articalId,
			userId:uid,
			createAt:new Date().valueOf(),
			targetId:author.dataValues.userId,
			read:0
		}))
		if(agreeData){
			result={
				status:0,
				msg:"点赞成功"
			}
			var master=await(User.findOne({
				where:{
					id:author.dataValues.userId
				}
			}))
			var weight=master.dataValues.weight+1;
			User.update({
				weight:weight
			},{
				where:{
					id:author.dataValues.userId
				}
			})

		}else{
			result={
				status:-1,
				msg:"点赞出错了~"
			}
		}
	}
	
	res.writeHead(200,{'Content-Type':'text/json;charset=utf-8'})
	res.end(JSON.stringify(result))
}))