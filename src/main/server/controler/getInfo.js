var async = require('asyncawait/async');
var await = require('asyncawait/await');

var User = require('../modules/resume/user');
module.exports=(async (function(req,response){
	var result;
	// loginFilter(req,response);
	var uid=req.session.uid;
	var res=await(User.findOne({
		where:{
			id:uid
		}
	}))
	result={status:0,data:{
		userName:res.userName,
		updateAt:res.updateAt,
		img:res.img
	}};
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))