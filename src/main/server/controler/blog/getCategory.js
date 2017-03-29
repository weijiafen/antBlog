var menus=require('../../modules/blog/menus.js');
var category=require('../../modules/blog/category.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

module.exports=(async (function(method,req,response){
	var result={};
	var uid=req.session.uid;
	//建立表联系
	category.belongsTo(menus);
	menus.hasMany(category);
	if(method==='get'){
		var res=await (menus.findAll({
			where:{
				userId:uid
			},
			//联表查询
			include:[category]
		}))
		if(res.length>0){
			result.status=0;
			result.msg="查询成功";
			result.data={
				menus:[]
			};
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
		else{
			result.status=-1;
			result.msg="暂无数据"
		}
	}
	else if(method==='post'){
		for(var menu of req.body.menus){
			if(menu.id===0){
				//新建一个菜单
				var new_menu=await(menus.create({
					menuName:menu.menuName,
					userId:uid
				}))
				for(var child of menu.children){
					await(category.create({
							categoryName:child.categoryName,
							menuId:new_menu.dataValues.id
					}))
				}
			}else{
				//更新一个菜单
				await(menus.update({
					menuName:menu.menuName
				},{
					where:{
						id:menu.id
					}
				}))
				for(var child of menu.children){
					if(child.id===0){
						await(category.create({
							categoryName:child.categoryName,
							menuId:menu.id
						}))
					}else{
						await(category.update({
							categoryName:child.categoryName,
						},{
							where:{
								id:child.id,
								menuId:menu.id
							}
						}))
					}
				}
			}
		}
		result={status:0,msg:"更新成功"}
	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))