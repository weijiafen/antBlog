var artical=require('../../modules/blog/artical');
var agree=require('../../modules/blog/agree');
var comment=require('../../modules/blog/comment');
var User=require('../../modules/resume/user');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
module.exports=(async (function(req,response){
	var result={};
	var uid=req.session.uid;
	var pageSize=parseInt(req.query.pageSize);
	var pageNum=parseInt(req.query.pageNum);
	//建立表联系
	agree.belongsTo(artical)
	artical.hasMany(agree);
	agree.belongsTo(User);
	User.hasMany(agree);
	comment.belongsTo(artical);
	artical.hasMany(comment);
	comment.belongsTo(User);
	User.hasMany(comment);
	//查询点赞数据
	var agreeData=await(agree.findAll({
		where:{
			targetId:uid,
			read:0
		},
		'order': [
				['createAt', 'DESC']	//按照最近更新排序
			],
		include:[User,artical]
	}))
	//获取列表时就将数据设为已读，但不需阻塞线程
	var readAgree=agree.update({
			read:1
		},
		{
			where:{
				targetId:uid,
				read:0
			}
		})
	var agreeList=[];
	for(var agreeItem of agreeData){
		agreeList.push({
			userName:agreeItem.dataValues.user.dataValues.userName,
			articalName:agreeItem.dataValues.artical.dataValues.articalName,
			articalId:agreeItem.dataValues.artical.dataValues.id,
			authorId:agreeItem.dataValues.artical.dataValues.userId,
			categoryId:agreeItem.dataValues.artical.dataValues.categoryId,
			createAt:agreeItem.dataValues.createAt,
			userId:agreeItem.dataValues.userId,
			id:agreeItem.dataValues.id
		})
	}
	//七天前的时间戳
	var weekBefore=new Date().valueOf()-7*24*60*60*1000
	//查询七天内的评论通知
	var commentsData=await(comment.findAll({
		where:{
			'$or':[
				{
					//目标和作者ID都是该user，且userId非自己，是别人直接留言:type1
					//用户XXX（userId）在articalName（articalId）中回复了你targetId：content（articalId,authorId）
					targetId:uid,
					authorId:uid,
					createAt:{
						'$gt':weekBefore
					}
				},
				{
					//目标id是该user，作者id不是，是在别人的文章中留言被回复:type2
					//用户userName(userId) 在articalName（articalId）中回复了你targetId：content（articalId,authorId）
					targetId:uid,
					authorId:{
						'$ne':uid
					},
					createAt:{
						'$gt':weekBefore
					}
				},
				{
					//目标Id不是该user，作者id是，表示别人在自己文章下对话，文章作者得到通知:type3
					//用户userName(userId) 在articalName（articalId）中回复了别人(targetId)：content（articalId,authorId）
					targetId:{
						'$ne':uid
					},
					userId:{
						'$ne':uid
					},
					authorId:uid,
					createAt:{
						'$gt':weekBefore
					}
				}
			]
			/*
			userId  targetId  authorId   description
			自己	自己		自己	给自己留言，可以收到消息  1
			别人	自己		自己	别人给自己留言，可以收到消息  1
			自己 	自己 		别人 	在别人的文章下回复自己的留言，应该收到消息   2
			别人 	自己 		别人 	在别人的文章下留言被回复，可以收到消息  2
			别人 	别人   		自己	别人在自己文章下留言，可以收到消息   3
			自己	别人 		自己	在自己文章下回复别人的消息，自己不该收到消息
			自己	别人 		别人 	在别人的文章下评论别人，不该收到消息
			别人 	别人 		别人 	关你鸟事，不该收到消息
			*/

		},
		'order': [
				['createAt', 'DESC']	//按照最近更新排序
			],
		'limit': pageSize,                      // 每页多少条
    	'offset': pageSize * (pageNum - 1),  // 跳过多少条
		include:[User,artical]
	}))
	var commentList=[]
	for(var commentItem of commentsData){
		var temp={}
		if(commentItem.dataValues.targetId===uid&&commentItem.dataValues.authorId===uid){
			temp.type=1
		}
		else if(commentItem.dataValues.targetId===uid&&commentItem.dataValues.authorId!==uid){
			temp.type=2
		}
		else if(commentItem.dataValues.targetId!==uid&&commentItem.dataValues.authorId===uid){
			temp.type=3
		}
		temp.userId=commentItem.dataValues.userId;
		temp.targetId=commentItem.dataValues.targetId;
		temp.authorId=commentItem.dataValues.authorId;
		temp.content=commentItem.dataValues.content;
		temp.createAt=commentItem.dataValues.createAt;
		temp.id=commentItem.dataValues.id;
		temp.userName=commentItem.dataValues.user.dataValues.userName;
		temp.articalName=commentItem.dataValues.artical.dataValues.articalName;
		temp.articalId=commentItem.dataValues.artical.dataValues.id;
		temp.categoryId=commentItem.dataValues.artical.dataValues.categoryId;
		commentList.push(temp)

	}
	//统计七天内的评论通知条数
	var commentsCount=await(comment.findAndCountAll({
		where:{
			'$or':[
				{
					targetId:uid,
					authorId:uid,
					createAt:{
						'$gt':weekBefore
					}
				},
				{
					targetId:uid,
					authorId:{
						'$ne':uid
					},
					createAt:{
						'$gt':weekBefore
					}
				},
				{
					targetId:{
						'$ne':uid
					},
					userId:{
						'$ne':uid
					},
					authorId:uid,
					createAt:{
						'$gt':weekBefore
					}
				}
			]
		}
	}))
	//将三类通知设置为已读，去掉消息红点，不需阻塞线程
	var readComment1=comment.update({
		targetRead:1,
		authorRead:1
	},{
		where:{
					//目标和作者ID都是该user，是直接留言
					targetId:uid,
					authorId:uid,
					targetRead:0,
					authorRead:0
		}
	})
	var readComment2=comment.update({
		targetRead:1
	},{
		where:{
					targetId:uid,
					authorId:{
						'$ne':uid
					},
					targetRead:0
		}
	})
	var readComment3=comment.update({
		authorRead:1
	},{
		where:{
					targetId:{
						'$ne':uid
					},
					userId:{
						'$ne':uid
					},
					authorId:uid,
					authorRead:0
		}
	})

	result={
		status:0,
		msg:"查询成功",
		data:{
			agreeList:agreeList,
			commentList:commentList,
			total:commentsCount.count
		}
	}
	response.writeHead(200,{'Content-Type':"text/html;charset=utf-8"})
	response.end(JSON.stringify(result));
}))