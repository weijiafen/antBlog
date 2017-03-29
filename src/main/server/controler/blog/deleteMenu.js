var async =require('asyncawait/async');
var await =require('asyncawait/await');
var menus=require('../../modules/blog/menus');

module.exports=(async(function(req,response){
	var id=req.query.id
	var uid=req.session.uid;
	var result;
	if(id){
		var res=await(menus.destroy({
			where:{
				id:id,
				userId:uid
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