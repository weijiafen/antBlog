var menus=require('../../modules/blog/menus.js');
var category=require('../../modules/blog/category.js');
var artical=require('../../modules/blog/artical');
var agree=require('../../modules/blog/agree');
var comment=require('../../modules/blog/comment');
var trimHtml=require('trim-html')
var async = require('asyncawait/async');
var await = require('asyncawait/await');

module.exports=(async (function(req,response){
	var result={};
	var uid;
	if(req.session.uid){
		uid=req.session.uid
	}
	if(req.query.userId){
		uid=req.query.userId
	}
	var menuId=parseInt(req.query.menuId);
	var categoryId=parseInt(req.query.categoryId||0);
	var pageSize=parseInt(req.query.pageSize);
	var pageNum=parseInt(req.query.pageNum);
	var categoryIds=[];
	var articalList=[];
	//categoryName：在博客前台用到
	var categoryName="全部"
	//建立表联系
	artical.belongsTo(category);
	category.hasMany(artical);
	agree.belongsTo(artical);
	artical.hasMany(agree);
	comment.belongsTo(artical);
	artical.hasMany(comment);
	//博客前台请求列表时，传入的MenuId为-1，当categoryId为0时，将menuId重置为0，查询所有文章
	if(categoryId===0&&menuId===-1){
		menuId=0;
	}
	if(menuId===0){
		var menusData=await(menus.findAll({
			'attributes':['id'],
			where:{
				userId:uid
			}
		}))
		for(var menu of menusData){
			var categoryData=await(category.findAll({
				'attributes':['id'],
				where:{
					menuId:menu.dataValues.id
				}
			}))
			for(var categoryItem of categoryData){
				categoryIds.push(categoryItem.dataValues.id);
			}
		}
	}
	else{
		if(categoryId===0){
			var categoryData=await(category.findAll({
				'attributes':['id'],
				where:{
					menuId:menuId
				}
			}))
			for(var categoryItem of categoryData){
				categoryIds.push(categoryItem.dataValues.id);
			}
		}else{
			categoryIds.push(categoryId);
			var item=await(category.findOne({
				where:{
					id:categoryId
				}
			}))
			if(item){
				categoryName=item.dataValues.categoryName;
				result.data={
					categoryName:categoryName
				};
			}
			
		}
	}
	var articalsData=[];
	if(categoryIds.length!==0){
		articalsData=await (artical.findAll({
			'limit': pageSize,                      // 每页多少条
			'offset': pageSize * (pageNum - 1) , // 跳过多少条
			'order': [
				['updateAt', 'DESC']	//按照最近更新排序
			],
			where:{
				categoryId:categoryIds
			},
			//联表查询
			include:[category,agree,comment]
		}))
	}
	
	if(articalsData.length>0){
		result.status=0;
		articalsCount=await(artical.findAndCountAll({
			where:{
				categoryId:categoryIds
			}
		}))
		result.msg="查询成功";
		result.data={
			articalList:[],
			total:articalsCount.count,
			categoryName:categoryName
		};
		for(var item of articalsData){
			var temp={};
			//去除文章正文的Html标签并截取200字
			var trimmed =trimHtml(item.dataValues.articalContent,{limit:120});
			temp.menuId=item.dataValues.category.dataValues.menuId;
			temp.categoryName=item.dataValues.category.dataValues.categoryName;
			temp.categoryId=item.dataValues.category.dataValues.id;
			temp.id=item.dataValues.id;
			temp.key=item.dataValues.id;
			temp.articalName=item.dataValues.articalName;
			temp.articalContent=trimmed.html;
			temp.reading=item.dataValues.reading;
			temp.createAt=item.dataValues.createAt;
			temp.updateAt=item.dataValues.updateAt;
			temp.agree=item.dataValues.agrees.length;
			temp.comment=item.dataValues.comments.length;
			result.data.articalList.push(temp)
		}
	}
	else{
		result.status=-1;
		result.msg="暂无数据";
		result.data={
			articalList:[],
			categoryName:categoryName
		};

	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))