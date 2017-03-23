var async = require('asyncawait/async');
var await = require('asyncawait/await');
var competitions_item=require('../../modules/resume/competitions_item');
module.exports=(async(function(req,response){
	var id=req.query.id;
	var result;
	var res=await (competitions_item.destroy({
		where:{
			id:id
		}
	}));
	if(res===0){
		result={status:-1,msg:"删除失败"}
	}else{
		result={status:0,msg:"删除成功"}
	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))