module.exports=function(req,res){
	var session=req.session;
	if(session.isLogin){
		result= true
	}else{
		result= false
	}
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	if(result){
		res.end(JSON.stringify({status:0,msg:'已登录'}))
	}else{
		res.end(JSON.stringify({status:-1,msg:'未登录'}))
	}
}