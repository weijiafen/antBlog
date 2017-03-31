var User=require('../modules/resume/user.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
//node提供的加密模块
var crypto = require('crypto')
module.exports=(async (function(req,response){
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
	if(res){
		req.session.uid=res.id;
		req.session.isLogin=true;
		result={status:0,msg:"登录成功"}
		var now=(new Date()).valueOf();
		var weight=res.weight;
		var newUpdate=res.updateAt;
		if(now-res.updateAt>1000*60*60*22){
			//22小时后登录会给排序权值加1
			weight+=1;
			newUpdate=now;
		}
		//updateAt用来记录上次登录加权重的时间
		//30s后更新最近登录时间，避免登录成功后立刻拿到最新的登录时间（非最优策略）
		setTimeout(function(){
			User.update({
				lastLoginAt:now,
				updateAt:newUpdate,
				weight:weight
			},{
				where:{
					id:res.id
				}
			})
		},30*1000)
		
	}else{
		result={status:-1,msg:"账号名或密码错误"}
	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))