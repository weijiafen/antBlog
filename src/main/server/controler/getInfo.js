var async = require('asyncawait/async');
var await = require('asyncawait/await');

var User = require('../modules/resume/user');
var personal_info=require('../modules/resume/personal_info.js');
var skills_level=require('../modules/resume/skills_level.js');
var project_exp=require('../modules/resume/project_exp.js');
var work_exp=require('../modules/resume/work_exp.js');
var competitions=require('../modules/resume/competitions.js');
var library=require('../modules/resume/library.js');
module.exports=(async (function(req,response){
	//建立表联系
	personal_info.belongsTo(User);
	User.hasOne(personal_info);
	skills_level.belongsTo(User);
	User.hasOne(skills_level);
	project_exp.belongsTo(User);
	User.hasOne(project_exp);
	work_exp.belongsTo(User);
	User.hasOne(work_exp);
	competitions.belongsTo(User);
	User.hasOne(competitions);
	library.belongsTo(User);
	User.hasOne(library);

	var result;
	// loginFilter(req,response);
	var uid=req.session.uid;
	var res=await(User.findOne({
		where:{
			id:uid
		},
		//联表查询
		include:[personal_info,skills_level,project_exp,work_exp,competitions,library]
	}))
	//又是这个坑，返回的res自动去掉了s
	// console.log('res',res.competitions)
	var resumeTitles=[];
	resumeTitles.push(res.personal_info.dataValues.title)
	resumeTitles.push(res.skills_level.dataValues.title)
	resumeTitles.push(res.project_exp.dataValues.title)
	resumeTitles.push(res.work_exp.dataValues.title)
	resumeTitles.push(res.competition.dataValues.title)
	resumeTitles.push(res.library.dataValues.title)
	result={status:0,data:{
		userName:res.userName,
		updateAt:res.updateAt,
		img:res.img,
		resumeTitles:resumeTitles
	}};
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))