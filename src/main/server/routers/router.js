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
	app.get(/\/blog\/list\/[0-9]+/,function(req,res){
		res.end(req.toString())
	})
	app.get('/isLogin',function(req,res){
		isLogin(req,res);
	})
	app.post('/logOff',function(req,res){
		logOff(req);
		res.end(JSON.stringify({status:0,msg:'注销成功'}))
	})
	app.post('/register',function(req,res){
		register(req,res);
		
	})
	app.post('/login',function(req,res){
		login(req,res);
	})
	app.post('/upload',function(req,res){
		upload(req,res);
	})
	//添加登录过滤器，需要登录才能获取数据的接口应放在此句下面
	app.use(loginFilter);
	app.get('/resume/userTop',function(req,res){
		userTop('get',req,res);
	})
  
});
}
