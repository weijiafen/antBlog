
process.setMaxListeners(0)
var User=require('../modules/resume/user.js');
var personal_info=require('../modules/resume/personal_info.js');
var skills_level=require('../modules/resume/skills_level.js');
var project_exp=require('../modules/resume/project_exp.js');
var project_item=require('../modules/resume/project_item.js');
var project_item_des=require('../modules/resume/project_item_des.js');
var work_exp=require('../modules/resume/work_exp.js');
var work_item=require('../modules/resume/work_item.js');
var competitions=require('../modules/resume/competitions.js');
var competitions_item=require('../modules/resume/competitions_item.js');
var library=require('../modules/resume/library.js');
var library_item=require('../modules/resume/library_item.js');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

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

	var id=req.query.id;
	var result={}
	var res=await (User.findOne({
		where:{
			id:id
		},
		//联表查询
		include:[personal_info,skills_level,project_exp,work_exp,competitions,library]
	}))
	if(res){
		result.status=0;
		var resultData={}
		resultData.id=res.dataValues.id;
		resultData.top={
			name:res.dataValues.userName||'',
			introduce:res.dataValues.introduce||'',
			img:res.dataValues.img||'',
			background_img:res.dataValues.background_img||'',
			color:res.dataValues.color
		}

		//简历块个人信息，技能数据适配
		resultData.personal_info=undefined;
		resultData.skills_level=undefined;
		if(res.personal_info){
			resultData.personal_info=res.personal_info.dataValues;
			if(resultData.personal_info.data===''){
				resultData.personal_info.data=[];
			}else{
				var data=resultData.personal_info.data;
				var dataArr=[]
				for(var info of data.split('@@')){
					var obj={}
					obj.key=info.split('||')[0]
					obj.value=info.split('||')[1]
					dataArr.push(obj)
				}
				resultData.personal_info.data=dataArr;
			}
			

		}
		if(res.skills_level){
			resultData.skills_level=res.skills_level.dataValues;
			if(resultData.skills_level.data===''){
				resultData.skills_level.data=[];
			}else{
				var data=resultData.skills_level.data;
				var dataArr=[]
				for(var skill of data.split('@@')){
					var obj={}
					obj.key=skill.split('||')[0]
					//空时会为0
					obj.value=Number(skill.split('||')[1])
					dataArr.push(obj)
				}
				resultData.skills_level.data=dataArr;
			}
		}

		//简历块项目经验数据适配
		resultData.project_exp=undefined
		if(res.project_exp){
			resultData.project_exp=res.project_exp.dataValues;
			resultData.project_exp.data=[];
			var projectExpItem=await(project_item.findAll({
				where:{
					projectId:res.project_exp.dataValues.id
				}
			}))
			for(var item of projectExpItem){
				var descriptions=await(project_item_des.findAll({
					where:{
						itemId:item.dataValues.id
					}
				}))
				item.dataValues.descriptions=[];
				for(var des of descriptions){
					item.dataValues.descriptions.push(des.dataValues);
				}
				resultData.project_exp.data.push(item.dataValues)
			}
		}
		//简历块工作经验数据适配
		resultData.work_exp=undefined
		if(res.work_exp){
			resultData.work_exp=res.work_exp.dataValues;
			resultData.work_exp.data=[];
			var workItem=await(work_item.findAll({
				where:{
					workId:res.work_exp.dataValues.id
				}
			}))
			for(var item of workItem){
				resultData.work_exp.data.push(item.dataValues)
			}
		}
		//简历块获奖经历数据适配
		resultData.competitions=undefined
		//我也不知道为什么这里被sequelize变成了competition,把s给忽略了。感觉略坑
		if(res.competition){
			resultData.competitions=res.competition.dataValues;
			resultData.competitions.data=[];
			var competitionsItem=await(competitions_item.findAll({
				where:{
					competitionId:res.competition.dataValues.id
				}
			}))
			for(var item of competitionsItem){
				resultData.competitions.data.push(item.dataValues)
			}
		}
		//简历块个人书库数据适配
		resultData.library=undefined
		//我也不知道为什么这里被sequelize变成了competition,把s给忽略了。感觉略坑
		if(res.library){
			resultData.library=res.library.dataValues;
			resultData.library.data=[];
			var libraryItem=await(library_item.findAll({
				where:{
					libraryId:res.library.dataValues.id
				}
			}))
			for(var item of libraryItem){
				resultData.library.data.push(item.dataValues)
			}
		}
		result.data=resultData;
		
	}else{
		result={status:-1,msg:"此页面不存在"}
	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))