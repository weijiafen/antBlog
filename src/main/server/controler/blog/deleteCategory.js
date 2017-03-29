var async =require('asyncawait/async');
var await =require('asyncawait/await');
var category=require('../../modules/blog/category');

module.exports=(async(function(req,response){
	var id=req.query.id
	var result;
	if(id){
		var res=await(category.destroy({
			where:{
				id:id
			}
		}))
		if(res===0){
			result={status:-1,msg:"删除失败"}
		}else{
			result={status:0,msg:"删除成功"}
		}
	}
	else{
		result={status:-1,msg:"删除失败"}
	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
	response.end(JSON.stringify(result));
}))