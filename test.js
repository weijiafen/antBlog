
var captcha=require('./src/main/server/controler/captcha.js')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
(async (()=>{
	var s=await(captcha({session:{uid:1}}))
	console.log(s)
}))()
