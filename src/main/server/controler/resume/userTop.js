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
			backgroundImg:res.background_img
		}};
	}
	else if(method==='post'){

	}
	console.log('after getusertop')
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))