var async = require('asyncawait/async');
var await = require('asyncawait/await');

var User = require('../modules/resume/user');
var personal_info=require('../modules/resume/personal_info.js');
var skills_level=require('../modules/resume/skills_level.js');
var project_exp=require('../modules/resume/project_exp.js');
var work_exp=require('../modules/resume/work_exp.js');
var competitions=require('../modules/resume/competitions.js');
var library=require('../modules/resume/library.js');
var agree=require('../modules/blog/agree.js');
var comment=require('../modules/blog/comment.js');
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
	//统计所有未读的点赞
	var agreeData=await(agree.findAndCountAll({
		where:{
			targetId:uid,
			read:0
		}
	}))
	//统计所有未读留言数量
	var commentData=await(comment.findAndCountAll({
		where:{
			'$or':[
				{
					//目标和作者ID都是该user，是直接留言
					targetId:uid,
					authorId:uid,
					targetRead:0,
					authorRead:0
				},
				{
					//目标id是该user，作者id不是，是在别人的文章中留言被回复
					targetId:uid,
					authorId:{
						'$ne':uid
					},
					targetRead:0
				},
				{
					//目标Id不是该user，作者id是，表示别人在自己文章下对话，文章作者得到通知
					targetId:{
						'$ne':uid
					},
					authorId:uid,
					authorRead:0
				}
			]
		}
	}))
	//又是这个坑，返回的res自动去掉了s
	// console.log('res',res.competitions)
	var resumeTitles=['基础资料'];
	resumeTitles.push(res.personal_info.dataValues.title)
	resumeTitles.push(res.skills_level.dataValues.title)
	resumeTitles.push(res.project_exp.dataValues.title)
	resumeTitles.push(res.work_exp.dataValues.title)
	resumeTitles.push(res.competition.dataValues.title)
	resumeTitles.push(res.library.dataValues.title)
	result={status:0,data:{
		userName:res.userName,
		updateAt:res.updateAt,
		lastLoginAt:res.lastLoginAt,
		img:res.img,
		resumeTitles:resumeTitles,
		messageCount:agreeData.count+commentData.count
	}};
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))