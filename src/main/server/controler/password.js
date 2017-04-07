var User=require('../modules/resume/user.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
//node提供的加密模块
var crypto = require('crypto')
module.exports=(async (function(req,response){
	//修改密码类型：1找回密码，2后台修改密码
	var result={};
	var type=req.body.type;
	var password=req.body.password;
	var confirmPassword=req.body.confirmPassword
	if(type===1){
		var account=req.body.account;
		var emailCaptcha1=req.body.emailCaptcha;
		var emailCaptcha2=req.session.emailCaptcha;
		//验证验证码，防止非正常post
		if(emailCaptcha1!==emailCaptcha2){
			result={
				status:-1,
				msg:'此处应有验证码'
			}
		}else{
			if(password===""||password!==confirmPassword){
				result={
					status:-1,
					msg:'密码不一致啊'
				}
			}else{
				var md5 = crypto.createHash('md5');
				password = md5.update(password).digest('hex');
				var userDate=await(User.update({
					password:password
				},{
					where:{
						account:account
					}
				}))
				if(userDate){
					result={
						status:0,
						msg:'操作成功'
					}
				}else{
					result={
						status:-1,
						msg:'操作失败'
					}
				}
			}
		}
		response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
		response.end(JSON.stringify(result))
	}
	else if(type===2){
		//管理后台修改密码，需要传入type:2,account,password,confirmPassword,oldPassword
		var result={}
		var oldPassword=req.body.oldPassword;
		var uid =req.session.uid;
		var md5 = crypto.createHash('md5');
		oldPassword = md5.update(oldPassword).digest('hex');
		var userDate=await(User.findOne({
			where:{
				id:uid
			}
		}))
		if(userDate){
			if(userDate.dataValues.password===oldPassword){
				if(password===""||password!==confirmPassword){
					result={
						status:-1,
						msg:'密码不一致啊'
					}
				}else{
					var md5 = crypto.createHash('md5');
					password = md5.update(password).digest('hex');
					var userDate=await(User.update({
						password:password
					},{
						where:{
							id:uid
						}
					}))
					if(userDate){
						result={
							status:0,
							msg:'操作成功'
						}
					}else{
						result={
							status:-1,
							msg:'操作失败'
						}
					}
				}
			}else{
				result={
					status:-1,
					msg:"原密码错误"
				}
			}
		}else{
			result={
				status:-1,
				msg:"系统异常"
			}
		}
		response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
		response.end(JSON.stringify(result))
	}
}))