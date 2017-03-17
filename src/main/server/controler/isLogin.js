module.exports=function(req){
	var session=req.session;
	if(session.isLogin){
		return true
	}else{
		return false
	}
	
}