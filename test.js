
var captcha=require('./src/main/server/controler/blog/email.js')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
(async (()=>{
	var s=await(captcha('get',{query:{account:"asdasd"}}))
	console.log(s)
}))()
