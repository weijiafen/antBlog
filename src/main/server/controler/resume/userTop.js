var async = require('asyncawait/async');
var await = require('asyncawait/await');

var User = require('../../modules/resume/user');
module.exports=(async (function(method,req,response){
	var result;
	// loginFilter(req,response);
	var uid=req.session.uid;
	if(method==='get'){
		var res=await(User.findOne({
			where:{
				id:uid
			}
		}))
		result={status:0,data:{
			userName:res.userName,
			introduce:res.introduce,
			img:res.img,
			backgroundImg:res.background_img,
			color:res.color
		}};
	}
	else if(method==='post'){
		var res=await(User.update({
			userName:req.body.userName,
			introduce:req.body.introduce,
			img:req.body.img,
			background_img:req.body.backgroundImg,
			color:req.body.color
		},{
			where:{
				id:uid
			}
		}))
		result={status:0,msg:'保存成功'};
	}
	console.log('after getusertop')
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))