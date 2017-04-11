var menus=require('../../modules/blog/menus.js');
var category=require('../../modules/blog/category.js');
var fans=require('../../modules/blog/fans.js');
var User=require('../../modules/resume/user.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

module.exports=(async (function(req,response){
	var result={};
	//博主id
	var uid=req.query.userId;
	//游客id,未登录则为undefined
	var sid=req.session.uid;
	//建立表联系
	category.belongsTo(menus);
	menus.hasMany(category);
	var master=await(User.findOne({
		where:{
			id:uid
		}
	}))
	var isFans=false
	if(sid){
		var fansData=await(fans.findOne({
			where:{
				userId:sid,
				targetId:uid
			}
		}))
		if(fansData){
			isFans=true
		}
	}
	result.status=0;
	result.msg="查询成功";
	result.data={
		"name":master.dataValues.userName,
		"img":master.dataValues.img,
		"introduce":master.dataValues.introduce,
		"isFans":isFans,
		menus:[]
	};
	var res=await (menus.findAll({
		where:{
			userId:uid
		},
		//联表查询
		include:[category]
	}))
	if(res.length>0){
		
		for(var menu of res){
			var temp={};
			temp.menuName=menu.dataValues.menuName;
			temp.id=menu.dataValues.id;
			temp.children=[];
			//被sequelize自作多情地变成了复数啊。hasMany造成的
			// console.log("cate",menu.dataValues.categories)
			for(var children of menu.dataValues.categories){
				temp.children.push({
					id:children.dataValues.id,
					categoryName:children.dataValues.categoryName,
				})
			}
			result.data.menus.push(temp)
		}
	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))