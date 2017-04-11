var async = require('asyncawait/async');
var await = require('asyncawait/await');
var fans=require('../../modules/blog/fans')
var user=require('../../modules/resume/user')
var nodemailer = require('nodemailer');
module.exports=(async(function(type,targetId,articalName){
	//type:通知类型，1新增文章，2编辑文章
	var notifyType=type===1?'新发布了文章':'更新了文章';
	user.hasOne(fans);
	fans.belongsTo(user)
	var masterData=await(user.findOne({
		where:{
			id:targetId
		},
		attributes:['userName']
	}))
	var masterName=masterData.dataValues.userName;
	var fansData=await(fans.findAll({
		where:{
			targetId:targetId
		},
		include:[user]
	}))
	var fansList=[]
	for(var fansItem of fansData){
		let transporter = nodemailer.createTransport({
		    service: 'qq',
		    auth: {
		        user: '364886455@qq.com',
		        pass: 'opexznzzpxotbghe'
		    }
		});

		// setup email data with unicode symbols
		let mailOptions = {
		    from: '"Web Job Fun" <364886455@qq.com>', // sender address
		    to: fansItem.dataValues.user.dataValues.email, // list of receivers
		    subject: '关注动态', // Subject line
		    html: `<b>你在Web Job Fun 上关注的 ${masterName} ${notifyType} 《${articalName}》</b>` // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('向粉丝发送了邮件通知 %s sent: %s', info.messageId, info.response);
		});
	}
}))