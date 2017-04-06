var async = require('asyncawait/async');
var await = require('asyncawait/await');
var User=require('../../modules/resume/user')
var nodemailer = require('nodemailer');
function getEmailCaptcha(){
	var temp=""
	for(var i=0;i<4;i++){
		temp+=parseInt(Math.random()*10)
	}
	return temp
}
function encryptEmail(email){
	var index=email.indexOf("@")
	//一般加密个数为4个*，邮箱前缀少于4个则加密2个*

	var encryptLength=4;
	var template="****"
	if(index<4){
		encryptLength=2
		template="**"
	}
	var target=email.substr(index-encryptLength,encryptLength)
	var newEmail=email.replace(target,template)
	return newEmail
}
module.exports=(async(function(method,req,res){
	if(method==='get'){
		var result={};
		var account=req.query.account;
		var userDate=await(User.findOne({
			where:{
				account:account
			},
			attributes:['email']
		}))
		if(userDate){
			var targetEmail=userDate.dataValues.email;
			if(targetEmail===""){
				result={
					status:-1,
					msg:"账号中没有填写邮箱"
				}
			}else{
				var nowStamp=new Date().valueOf();
				var emailCaptcha;
				//session中存在过验证码
				if(req.session.emailCaptcha){
					//session中的验证码十分钟内不置换。
					if(nowStamp-req.session.emailStamp<10*60*1000){
						emailCaptcha=req.session.emailCaptcha;
						req.session.emailStamp=nowStamp;
					}else{
						//过期刷新验证码
						emailCaptcha=getEmailCaptcha();
						req.session.emailCaptcha=emailCaptcha;
						req.session.emailStamp=nowStamp
					}
				}else{
					emailCaptcha=getEmailCaptcha();
					req.session.emailCaptcha=emailCaptcha;
					req.session.emailStamp=nowStamp
				}
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
				    to: targetEmail, // list of receivers
				    subject: '密码找回', // Subject line
				    html: '<b>你现在正在使用Web Job Fun 的找回密码功能，验证码是【'+emailCaptcha+'】，十分钟内有效，如果非你本人操作，请谨慎给出此次验证码！</b>' // html body
				};

				// send mail with defined transport object
				transporter.sendMail(mailOptions, (error, info) => {
				    if (error) {
				        return console.log(error);
				    }
				    console.log('Message %s sent: %s', info.messageId, info.response);
				});
				var returnEmail=encryptEmail(targetEmail);
				result={
					status:0,
					msg:"发送验证码成功",
					data:returnEmail
				}
			}
		}
		else{
			result={
				status:-1,
				msg:"不存在的账号"
			}
		}
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
		res.end(JSON.stringify(result));
		
	}
	else if(method==='post'){
		var result={};
		var emailCaptcha1=req.session.emailCaptcha;
		var emailCaptcha2=req.body.emailCaptcha;
		if(emailCaptcha1==emailCaptcha2){
			result={
				status:0,
				msg:'验证码正确',
				data:emailCaptcha2
			}
		}else{
			result={
				status:-1,
				msg:"验证码不正确"
			}
		}
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
		res.end(JSON.stringify(result));
	}
	
}))