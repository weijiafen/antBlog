process.setMaxListeners(0)
var session = require('express-session');
var fs=require('fs');
var path = require('path');
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
var captcha=require('../controler/captcha')
var getUserList=require('../controler/resume/getUserList')
var getCategory=require('../controler/blog/getCategory')
var deleteMenu=require('../controler/blog/deleteMenu')
var deleteCategory=require('../controler/blog/deleteCategory')
var getArticalList=require('../controler/blog/getArticalList')
var ArticalDetail=require('../controler/blog/ArticalDetail')
var articalComment=require('../controler/blog/articalComment')
var getHead=require('../controler/blog/getHead')
var setAgree=require('../controler/blog/setAgree')
var getMessageList=require('../controler/blog/getMessageList')
var email=require('../controler/blog/email')
var fans=require('../controler/blog/fans')
var password=require('../controler/password')
var ueditor = require("ueditor")
module.exports=function(app){
	//app是一个express()
	app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
	app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
	  extended: true
	}));
	app.use(session({
	    secret: 'hubwiz app', //secret的值建议使用随机字符串
	    cookie: {maxAge: 60 * 1000 * 30}, // 过期时间（毫秒）
	    resave:true		//在操作的时候重新设置session。顺延登录时间
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
	//获取验证码
	app.get('/captcha',function(req,res){
		captcha(req,res);
	})
	//获取邮箱验证码
	app.get('/emailCaptcha',function(req,res){
		email('get',req,res);
	})
	//提交邮箱验证码
	app.post('/emailCaptcha',function(req,res){
		email('post',req,res);
	})
	//关注博主
	app.post('/blog/fans',function(req,res){
		fans('post',req,res);
	})
	//取消关注博主
	app.delete('/blog/fans',function(req,res){
		fans('delete',req,res);
	})
	//修改密码
	app.post('/modifyPassword',function(req,res){
		password(req,res);
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
	//获取文章详情，在管理后台和博客前台都可用，不需权限
	app.get('/blog/ArticalDetail',function(req,res){
		ArticalDetail('get',req,res);
	})
	//获取博客头部信息和列表
	app.get('/blog/getHead',function(req,res){
		getHead(req,res);
	})
	//获取博客文章列表,管理后台和博客前端都可使用，不需权限。
	//后台使用session.uid取，博客前台用query.userId取对应用户ID
	app.get('/blog/getArticalList',function(req,res){
		getArticalList(req,res);
	})
	//博客前台获取文章评论列表
	app.get('/blog/articalComment',function(req,res){
		articalComment('get',req,res);
	})
	//点赞
	app.post('/blog/setAgree',function(req,res){
		setAgree(req,res);
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
	//管理后台获取博客分类
	app.get('/blog/getCategory',function(req,res){
		getCategory('get',req,res);
	})
	//管理后台设置博客分类
	app.post('/blog/getCategory',function(req,res){
		getCategory('post',req,res);
	})
	//管理后台删除一个一级菜单
	app.delete('/blog/deleteMenu',function(req,res){
		deleteMenu(req,res);
	})
	//管理后台删除一个二级菜单
	app.delete('/blog/deleteCategory',function(req,res){
		deleteCategory(req,res);
	})
	
	//管理后台修改文章详情
	app.post('/blog/ArticalDetail',function(req,res){
		ArticalDetail('post',req,res);
	})
	//管理后台删除文章
	app.delete('/blog/ArticalDetail',function(req,res){
		ArticalDetail('delete',req,res);
	})
	//添加评论
	app.post('/blog/articalComment',function(req,res){
		articalComment('post',req,res);
	})
	//管理后台获取消息列表
	app.get('/blog/getMessageList',function(req,res){
		getMessageList(req,res);
	})

	// /ueditor 入口地址配置 https://github.com/netpi/ueditor/blob/master/example/public/ueditor/ueditor.config.js
	// 官方例子是这样的 serverUrl: URL + "php/controller.php"
	// 我们要把它改成 serverUrl: URL + 'ue'
	app.use("/ueditor/ue", ueditor(path.join(process.cwd(), '/upload'), function(req, res, next) {

	  // ueditor 客户发起上传图片请求

	  if(req.query.action === 'uploadimage'){

	    // 这里你可以获得上传图片的信息
	    var foo = req.ueditor;

	    // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
	    var img_url = '/ueditor';
	    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
	  }
	  //  客户端发起图片列表请求
	  else if (req.query.action === 'listimage'){
	    var dir_url = 'your img_dir'; // 要展示给客户端的文件夹路径
	    res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
	  }
	  // 客户端发起其它请求
	  else {

	    res.setHeader('Content-Type', 'application/json');
	    // 这里填写 ueditor.config.json 这个文件的路径
	    res.redirect('/js/club/ueditor/ueditor.config.json')
	}}));
});
}
