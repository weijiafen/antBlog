var async = require('asyncawait/async');
var await = require('asyncawait/await');
var project_item_des=require('../../modules/resume/project_item_des');
module.exports=(async(function(req,response){
	//get或delete通过params传来的参数用query取
	var id=req.query.id;
	var result;
	var res=await (project_item_des.destroy({
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