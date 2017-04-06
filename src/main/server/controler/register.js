var User=require('../modules/resume/user.js');
var personal_info=require('../modules/resume/personal_info.js');
var skills_level=require('../modules/resume/skills_level.js');
var project_exp=require('../modules/resume/project_exp.js');
var work_exp=require('../modules/resume/work_exp.js');
var competitions=require('../modules/resume/competitions.js');
var library=require('../modules/resume/library.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
//node提供的加密模块
var crypto = require('crypto')
module.exports=(async (function(req,response){
	var userName=req.body.userName;
	var password=req.body.password;
	var account=req.body.account;
	var email=req.body.email;
	var time=new Date().valueOf();
	var captcha=req.body.captcha.toLowerCase();
	console.log('captcha',captcha)
	console.log('req.session.captcha',req.session.captcha)
	if(!account){
		result={status:-1,msg:'账号为空'}
	}
	else if(!password){
		result={status:-1,msg:'密码为空'}
	}
	else if(captcha!==req.session.captcha.toLowerCase()){
		result={status:-1,msg:'验证码错误'}
	}
	else{
		var isExits=await(User.findOne({
			where:{
				account:account
			}
		}))
		if(isExits){
			result= {
				status:-1,
				msg:"账号已存在"
			}
		}else{
			var md5 = crypto.createHash('md5');
			password = md5.update(password).digest('hex');
			var result={}
			var res=await (User.create({
				account:account,
				password:password,
				userName:userName,
				email:email,
				createAt:time,
				updateAt:time,
				lastLoginAt:time,
				img:'images/default.jpg',
				introduce:'',
				background_img:'',
				color:'',
				weight:0
			}))
			if(res){
				//新建主页的各标题
				await(personal_info.create({
					isShow:0,
					title:'个人信息',
					img:'images/default.jpg',
					background_img:'',
					createAt:time,
					updateAt:time,
					userId:res.id,
					color:'',
					data:''
				}))
				await(skills_level.create({
					isShow:0,
					title:'技能自评',
					img:'',
					background_img:'',
					createAt:time,
					updateAt:time,
					userId:res.id,
					color:'',
					data:''
				}))
				await(project_exp.create({
					isShow:0,
					title:'项目经历',
					img:'',
					background_img:'',
					createAt:time,
					updateAt:time,
					color:'',
					userId:res.id
				}))
				await(work_exp.create({
					isShow:0,
					title:'工作经历',
					img:'',
					background_img:'',
					createAt:time,
					updateAt:time,
					color:'',
					userId:res.id
				}))
				await(competitions.create({
					isShow:0,
					title:'获奖经历',
					img:'',
					background_img:'',
					createAt:time,
					updateAt:time,
					userId:res.id,
					color:'',
					data:''
				}))
				await(library.create({
					isShow:0,
					title:'个人书库',
					img:'',
					background_img:'',
					createAt:time,
					updateAt:time,
					color:'',
					userId:res.id
				}))
				req.session.uid=res.id;
				req.session.isLogin=true;
				result={status:0,msg:"注册成功,将为您自动登录..."}
			}else{
				result={status:-1,msg:"注册失败"}
			}
		}
	}
	
	
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))