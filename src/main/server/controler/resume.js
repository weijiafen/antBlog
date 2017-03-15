
process.setMaxListeners(0)
var User=require('../modules/user.js');
var personal_info=require('../modules/personal_info.js');
var skills_level=require('../modules/skills_level.js');
var project_exp=require('../modules/project_exp.js');
var project_item=require('../modules/project_item.js');
var project_item_des=require('../modules/project_item_des.js');
var work_exp=require('../modules/work_exp.js');
var work_item=require('../modules/work_item.js');
var competitions=require('../modules/competitions.js');
var competitions_item=require('../modules/competitions_item.js');
var library=require('../modules/library.js');
var library_item=require('../modules/library_item.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

module.exports=(async (function(req){
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

	var id=req.id;
	var result={}
	var res=await (User.findOne({
		where:{
			id:id
		},
		//联表查询
		include:[personal_info,skills_level,project_exp,work_exp,competitions,library]
	}))
	if(res){
		result.id=res.dataValues.id;
		result.top={
			name:res.dataValues.userName||'',
			introduce:res.dataValues.introduce||'',
			img:res.dataValues.img||'',
			background_img:res.dataValues.background_img||''
		}

		//简历块个人信息，技能数据适配
		result.personal_info=undefined;
		result.skills_level=undefined;
		if(res.personal_info){
			result.personal_info=res.personal_info.dataValues;
			if(result.personal_info.data===''){
				result.personal_info.data=[];
			}else{
				var data=result.personal_info.data;
				var dataArr=[]
				for(var info of data.split('@@')){
					var obj={}
					obj.key=info.split('||')[0]
					obj.value=info.split('||')[1]
					dataArr.push(obj)
				}
				result.personal_info.data=dataArr;
			}
			

		}
		if(res.skills_level){
			result.skills_level=res.skills_level.dataValues;
			if(result.skills_level.data===''){
				result.skills_level.data=[];
			}else{
				var data=result.skills_level.data;
				var dataArr=[]
				for(var skill of data.split('@@')){
					var obj={}
					obj.key=skill.split('||')[0]
					obj.value=skill.split('||')[1]
					dataArr.push(obj)
				}
				result.skills_level.data=dataArr;
			}
		}

		//简历块项目经验数据适配
		result.project_exp=undefined
		if(res.project_exp){
			result.project_exp=res.project_exp.dataValues;
			result.project_exp.data=[];
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
				result.project_exp.data.push(item.dataValues)
			}
		}
		//简历块工作经验数据适配
		result.work_exp=undefined
		if(res.work_exp){
			result.work_exp=res.work_exp.dataValues;
			result.work_exp.data=[];
			var workItem=await(work_item.findAll({
				where:{
					workId:res.work_exp.dataValues.id
				}
			}))
			for(var item of workItem){
				result.work_exp.data.push(item.dataValues)
			}
		}
		//简历块获奖经历数据适配
		result.competitions=undefined
		//我也不知道为什么这里被sequelize变成了competition,把s给忽略了。感觉略坑
		if(res.competition){
			result.competitions=res.competition.dataValues;
			result.competitions.data=[];
			var competitionsItem=await(competitions_item.findAll({
				where:{
					competitionId:res.competition.dataValues.id
				}
			}))
			for(var item of competitionsItem){
				result.competitions.data.push(item.dataValues)
			}
		}
		//简历块个人书库数据适配
		result.library=undefined
		//我也不知道为什么这里被sequelize变成了competition,把s给忽略了。感觉略坑
		if(res.library){
			result.library=res.library.dataValues;
			result.library.data=[];
			var libraryItem=await(library_item.findAll({
				where:{
					libraryId:res.library.dataValues.id
				}
			}))
			for(var item of libraryItem){
				result.library.data.push(item.dataValues)
			}
		}
		
		
	}else{
		result={status:-1,msg:"此页面不存在"}
	}
	
	console.log("step2")
	return result;
}))