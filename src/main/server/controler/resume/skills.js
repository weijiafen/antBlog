var async = require('asyncawait/async');
var await = require('asyncawait/await');

var skills_level = require('../../modules/resume/skills_level');
module.exports=(async (function(method,req,response){
	var result;
	var uid=req.session.uid;
	if(method==='get'){
		var res=await(skills_level.findOne({
			where:{
				userId:uid
			}
		}))
		var data=[]
		if(res.data===''){
			data=[];
		}else{
			var dataArr=[]
			for(var info of res.data.split('@@')){
				var obj={}
				obj.key=info.split('||')[0]
				obj.value=info.split('||')[1]
				dataArr.push(obj)
			}
			data=dataArr;
		}
		result={status:0,data:{
			img:res.img,
			backgroundImg:res.background_img,
			isShow:res.isShow,
			title:res.title,
			data:data,
			color:res.color
		}};
	}
	else if(method==='post'){
		var data=[];
		if(req.body.data.length>0){
			for(var item of req.body.data){
				if(item.key!==''){
					data.push(item.key+'||'+item.value)
				}
			}
		}
		data=data.join("@@")
		var res=await(skills_level.update({
			data:data,
			isShow:req.body.isShow,
			title:req.body.title,
			img:req.body.img,
			color:req.body.color,
			background_img:req.body.backgroundImg,
		},{
			where:{
				userId:uid
			}
		}))
		result={status:0,msg:'保存成功'};
	}
	console.log('after getusertop')
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))