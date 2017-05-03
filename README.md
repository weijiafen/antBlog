# antBlog
a blog build by react and ant-design

项目部署
#后台
1:安装mysql和navicat for mysql 
2：运行项目根目录的sql文件，生成本地环境数据库blog
3：在src/main/server/connection目录下新建一个dbConfig.js文件，配置你的本地数据库信息
	var dbConfig={
		dbName:'blog',
		user:'root',
		password:'weijiafen',
		host:'localhost',
		pool:{
			max: 5,
		    min: 0,
		    idle: 10000
		}
	}
	module.exports=dbConfig;
#前端
1：npm i  //安装前后端Js依赖
2：grunt   //编译静态文件，将static的文件copy到build中
3：webpack [--watch] //执行编译，开发环境下执行--watch监听改动
3：node server.js   //启动node服务器入口文件