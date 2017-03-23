process.setMaxListeners(0)
var session = require('express-session');
var fs=require('fs');
var bodyParser=require('body-parser')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var login=require('../controler/login.js');
var logOff=require('../controler/logOff.js');
var register=require('../controler/register.js');
var isLogin=require('../controler/isLogin.js');
var upload=require('../controler/upload.js');
var userTop=require('../controler/resume/userTop.js')
var loginFilter = require('../controler/loginFilter');
var getInfo = require('../controler/getInfo');
var personalInfo=require('../controler/resume/personalInfo.js')
var skills=require('../controler/resume/skills.js');
var projectExp=require('../controler/resume/projectExp')
var projectExpItem=require('../controler/resume/projectExpItem')
var projectExpItemDes=require('../controler/resume/projectExpItemDes')
var workExp=require('../controler/resume/workExp')
var workExpItem=require('../controler/resume/workExpItem')
var competitions=require('../controler/resume/competitions')
var competitionsItem=require('../controler/resume/competitionsItem')
var library=require('../controler/resume/library')
var libraryItem=require('../controler/resume/libraryItem')
var resume=require('../controler/resume')
var getUserList=require('../controler/resume/getUserList')
module.exports=function(app){
	//app是一个express()
	app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
	app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
	  extended: true
	}));
	app.use(session({
	    secret: 'hubwiz app', //secret的值建议使用随机字符串
	    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
	}));
	app.get('/', function (req, res) {
		fs.readFile('src/main/webapp/index.html',function(err,data){
			if(err){
				res.end('404');
			}
			else{
				res.end(data.toString());
			}
	})
	app.get('/getUserList',function(req,res){
		getUserList(req,res);
	})
	app.get('/getResume',function(req,res){
		resume(req,res);
	})
	app.get(/\/blog\/list\/[0-9]+/,function(req,res){
		res.end(req.toString())
	})
	//判断是否登录状态
	app.get('/isLogin',function(req,res){
		isLogin(req,res);
	})
	//注销登录
	app.post('/logOff',function(req,res){
		logOff(req);
		res.end(JSON.stringify({status:0,msg:'注销成功'}))
	})
	//注册
	app.post('/register',function(req,res){
		register(req,res);
		
	})
	//登录
	app.post('/login',function(req,res){
		login(req,res);
	})
	//上传文件接口
	app.post('/upload',function(req,res){
		upload(req,res);
	})



	//添加登录过滤器，需要登录才能获取数据的接口应放在此句下面
	app.use(loginFilter);

	//管理后台获取头像，最后登录时间
	app.get('/back/getInfo',function(req,res){
		getInfo(req,res);
	})
	//管理后台获取基础资料
	app.get('/resume/userTop',function(req,res){
		userTop('get',req,res);
	})
	//管理后台设置基础资料
	app.post('/resume/userTop',function(req,res){
		userTop('post',req,res);
	})
	//管理后台获取个人信息
	app.get('/resume/personalInfo',function(req,res){
		personalInfo('get',req,res);
	})
	//管理后台设置个人信息
	app.post('/resume/personalInfo',function(req,res){
		personalInfo('post',req,res);
	})
	//管理后台获取技能
	app.get('/resume/skills',function(req,res){
		skills('get',req,res);
	})
	//管理后台设置技能
	app.post('/resume/skills',function(req,res){
		skills('post',req,res);
	})
	//管理后台获取项目经验
	app.get('/resume/projectExp',function(req,res){
		projectExp('get',req,res);
	})
	//管理后台设置项目经验
	app.post('/resume/projectExp',function(req,res){
		projectExp('post',req,res);
	})
	//管理后台删除一个项目经验项
	app.delete('/resume/projectExpItem',function(req,res){
		projectExpItem(req,res);
	})
	//管理后台删除一个经验项下的键值对
	app.delete('/resume/projectExpItemDes',function(req,res){
		projectExpItemDes(req,res);
	})
  	//管理后台获取工作经验
	app.get('/resume/workExp',function(req,res){
		workExp('get',req,res);
	})
	//管理后台设置工作经验
	app.post('/resume/workExp',function(req,res){
		workExp('post',req,res);
	})
	//管理后台删除一个工作项
	app.delete('/resume/workExpItem',function(req,res){
		workExpItem(req,res);
	})
	//管理后台获取获奖经历
	app.get('/resume/competitions',function(req,res){
		competitions('get',req,res);
	})
	//管理后台设置获奖经历
	app.post('/resume/competitions',function(req,res){
		competitions('post',req,res);
	})
	//管理后台删除一个获奖经历
	app.delete('/resume/competitionsItem',function(req,res){
		competitionsItem(req,res);
	})
	//管理后台获取个人书库
	app.get('/resume/library',function(req,res){
		library('get',req,res);
	})
	//管理后台设置个人书库
	app.post('/resume/library',function(req,res){
		library('post',req,res);
	})
	//管理后台删除一个图书记录
	app.delete('/resume/libraryItem',function(req,res){
		libraryItem(req,res);
	})
});
}
