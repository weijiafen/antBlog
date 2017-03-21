module.exports=function(req,res,next){
	var session=req.session;
	if(session.isLogin&&session.uid){
		result= true
	}else{
		result= false
	}
	
	if(!result){
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
		res.end(JSON.stringify({status:1000,msg:'无权限'}))
	}else{
		next();
	}
}