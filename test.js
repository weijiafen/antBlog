
var notifyFans=require('./src/main/server/controler/blog/notifyFans.js')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
(async (()=>{
	var s=await(notifyFans(1,1))
	console.log(s)
}))()
