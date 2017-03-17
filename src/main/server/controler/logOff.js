module.exports=function(req){
	req.session.uid=undefined;
	req.session.isLogin=false;
}