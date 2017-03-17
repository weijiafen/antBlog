var session = require('express-session');
var fs=require('fs');
var bodyParser=require('body-parser')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var login=require('../controler/login.js');
var logOff=require('../controler/logOff.js');
var register=require('../controler/register.js');
var isLogin=require('../controler/isLogin.js');
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
		// if(!req.session.uid){
		// 	res.end(JSON.stringify({status:1000}))
		// }
		res.end(req.toString())
	})
	app.get('/isLogin',function(req,res){
		var result=isLogin(req);
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
		if(result){
			res.end(JSON.stringify({status:0,msg:'已登录'}))
		}else{
			res.end(JSON.stringify({status:-1,msg:'未登录'}))
		}
	})
	app.post('/logOff',function(req,res){
		logOff(req);
		res.end(JSON.stringify({status:0,msg:'注销成功'}))
	})
	app.post('/register',(async (function(req,res){
		var result=await (register(req));
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
		res.end(JSON.stringify(result))
	})))
	app.post('/login',(async (function(req,res){
		var result=await (login(req));
		console.log("step3")
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
		res.end(JSON.stringify(result))
	})))
  
});
}
