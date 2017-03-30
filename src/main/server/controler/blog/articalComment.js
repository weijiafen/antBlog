var comment=require('../../modules/blog/comment');
var User=require('../../modules/resume/user');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
module.exports=(async(function(method,req,res){
	var result;
	
	if(method==="get"){
		User.hasMany(comment);
		comment.belongsTo(User);
		var articalId=req.query.articalId;
		var pageSize=parseInt(req.query.pageSize)||10;
		var pageNum=parseInt(req.query.pageNum)||1;
		var commentsData=await(comment.findAll({
			where:{
				articalId:articalId
			},
			'limit': pageSize,                      // 每页多少条
			'offset': pageSize * (pageNum - 1) , // 跳过多少条
			include:[User],
			'order': [
					['createAt', 'DESC']	//按照最新发表排序
				]
		}))
		if(commentsData){
			var commentList=[];
			var countComment=await(comment.findAndCountAll({
				where:{
					articalId:articalId
				}
			}))
			for(commentItem of commentsData){
				commentList.push({
					id:commentItem.dataValues.id,
					userId:commentItem.dataValues.userId,
					targetId:commentItem.dataValues.targetId,
					content:commentItem.dataValues.content,
					createAt:commentItem.dataValues.createAt,
					articalId:commentItem.dataValues.articalId,
					authorId:commentItem.dataValues.authorId,
					userName:commentItem.dataValues.user.userName,
					img:commentItem.dataValues.user.img,
				})
			}
			result={
				status:0,
				msg:"查询成功",
				data:{
					total:countComment.count,
					commentList:commentList
				}
			}
		}
		else{
			result={
				status:1,
				msg:"查询异常"
			}
		}
		
	}
	else if(method==='post'){
		var nowStamp=new Date().valueOf();
		var uid=req.session.uid;
		var articalId=req.body.articalId;
		var authorId=req.body.authorId;
		var targetId=req.body.targetId;
		var content=req.body.content;
		//type:0直接留言；1回复留言
		var type=parseInt(req.body.type);
		//type为1时传入回复的评论id
		var commentId=req.body.commentId
		//目标不是作者的时候
		if(type===1){
			var oldComment=await(comment.findOne({
				where:{
					id:commentId
				},
				attributes:['content']
			}))
			content=content+oldComment.dataValues.content;
		}else{
			//只有留言才增加博主排序权重
			console.log("add weight")
			var master=await(User.findOne({
				where:{
					id:authorId
				}
			}))
			var weight=master.dataValues.weight+1;
			User.update({
				weight:weight
			},{
				where:{
					id:authorId
				}
			})
		}
		var commentResult=await(comment.create({
			userId:uid,
			articalId:articalId,
			authorId:authorId,
			targetId:targetId,
			content:content,
			createAt:nowStamp,
			targetRead:0,
			authorRead:0

		}))
		if(commentResult){
			result={
				status:0,
				msg:"评论成功"
			}
		}else{
			result={
				status:-1,
				msg:"评论失败"
			}
		}
		
	}
	else if(method==='delete'){

	}else{
		result={status:1,msg:"系统异常"}
	}
	res.writeHead(200,{'Content-Type':'text/json;charset=utf-8'})
	res.end(JSON.stringify(result))
}))