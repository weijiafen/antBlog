var session = require('express-session');
var fs=require('fs');
var bodyParser=require('body-parser')
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
	app.post('/login',function(req,res){
		console.log(req.body);
		res.end(JSON.stringify({status:0}))
	})
  
});
}
