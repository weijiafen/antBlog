var fans=require('../../modules/blog/fans');
var User=require('../../modules/resume/user');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
module.exports=(async(function(method,req,res){
	var result;
	if(method==='get'){

	}
	else if(method==='post'){
		var userId=req.session.uid;
		var targetId=req.body.targetId;
		if(userId){
			if(userId==targetId){
				result={
					status:-1,
					msg:"你咋可以自己关注自己呢？自恋！"
				}
			}else{
				//已登录才能关注,查询是否已关注过
				var isFansDate=await(fans.findOne({
					where:{
						userId:userId,
						targetId:targetId
					}
				}))
				if(isFansDate){
					result={
						status:-1,
						msg:"已关注"
					}
				}
				else{
					var fansDate=await(fans.create({
						userId:userId,
						targetId:targetId
					}))
					if(fansDate){
						result={
							status:0,
							msg:"关注成功"
						}
					}else{
						result={
							status:-1,
							msg:"关注失败"
						}
					}
				}
			}
			
		}else{
			result={
				status:-1,
				msg:"未登录"
			}
		}
	}
	else if(method==='delete'){
		var targetId=req.query.targetId;
		var userId=req.session.uid;
		if(userId){
			//已登录才能取消关注,查询是否已关注过
			var isFansDate=await(fans.findOne({
				where:{
					userId:userId,
					targetId:targetId
				}
			}))
			if(isFansDate){
				var fansDate=await(fans.destroy({
					where:{
						userId:userId,
						targetId:targetId
					}
				}))
				if(fansDate){
					result={
						status:0,
						msg:"取消关注成功"
					}
				}else{
					result={
						status:-1,
						msg:"取消关注失败"
					}
				}
			}
			else{
				result={
					status:-1,
					msg:"未关注"
				}
			}
		}else{
			result={
				status:-1,
				msg:"未登录"
			}
		}
	}
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.end(JSON.stringify(result))
}))