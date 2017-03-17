var User=require('../modules/user.js');
var personal_info=require('../modules/personal_info.js');
var skills_level=require('../modules/skills_level.js');
var project_exp=require('../modules/project_exp.js');
var work_exp=require('../modules/work_exp.js');
var competitions=require('../modules/competitions.js');
var library=require('../modules/library.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
//node提供的加密模块
var crypto = require('crypto')
module.exports=(async (function(req){
	var userName=req.body.userName;
	var password=req.body.password;
	var account=req.body.account;
	var time=new Date().valueOf();
	if(!account){
		return {status:-1,msg:'账号为空'}
	}
	if(!password){
		return {status:-1,msg:'密码为空'}
	}
	var isExits=await(User.findOne({
		where:{
			account:account
		}
	}))
	if(isExits){
		return {
			status:-1,
			msg:"账号已存在"
		}
	}
	var md5 = crypto.createHash('md5');
	password = md5.update(password).digest('hex');
	var result={}
	var res=await (User.create({
		account:account,
		password:password,
		userName:userName,
		createAt:time,
		updateAt:time,
		img:'',
		introduce:'',
		background_img:''
	}))
	console.log("create account :"+JSON.stringify(res))
	if(res){
		//新建主页的各标题
		await(personal_info.create({
			isShow:0,
			title:'个人信息',
			img:'',
			background_img:'',
			createAt:time,
			updateAt:time,
			userId:res.id,
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
			data:''
		}))
		await(project_exp.create({
			isShow:0,
			title:'项目经历',
			img:'',
			background_img:'',
			createAt:time,
			updateAt:time,
			userId:res.id
		}))
		await(work_exp.create({
			isShow:0,
			title:'工作经历',
			img:'',
			background_img:'',
			createAt:time,
			updateAt:time,
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
			data:''
		}))
		await(library.create({
			isShow:0,
			title:'个人书库',
			img:'',
			background_img:'',
			createAt:time,
			updateAt:time,
			userId:res.id
		}))
		req.session.uid=res.id;
		req.session.isLogin=true;
		result={status:0,msg:"注册成功,将为您自动登录..."}
	}else{
		result={status:-1,msg:"注册失败"}
	}
	return result;
}))