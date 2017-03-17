var User=require('../modules/user.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
//node提供的加密模块
var crypto = require('crypto')
module.exports=(async (function(req){
	console.log("step1")
	var account=req.body.account;
	var password=req.body.password;
	if(!account){
		return {status:-1,msg:'账号为空'}
	}
	if(!password){
		return {status:-1,msg:'密码为空'}
	}
	var md5 = crypto.createHash('md5');
	password = md5.update(password).digest('hex');
	var result={}
	var res=await (User.findOne({
		where:{
			account:account,
			password:password
		}
	}))
	console.log("sequlize success :"+JSON.stringify(res))
	if(res){
		req.session.uid=res.id;
		req.session.isLogin=true;
		result={status:0,msg:"登录成功"}
	}else{
		result={status:-1,msg:"账号名或密码错误"}
	}
	
	console.log("step2")
	return result;
}))