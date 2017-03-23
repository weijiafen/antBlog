var async = require('asyncawait/async');
var await = require('asyncawait/await');
var User=require('../../modules/resume/user');
module.exports=(async(function(req,response){
	var result={};
	var res=await (User.findAll({
		order:[
				['weight','DESC']
			]
		
	}));
	var data=[]
	for(var user of res){
		data.push({
			userId:user.id,
			img:user.img,
			userName:user.userName,
			introduce:user.introduce,
		})
	}
	result.data=data;
	result.status=0;
	result.msg="查询列表成功"
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))