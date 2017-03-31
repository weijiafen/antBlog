
var getMessageList=require('./src/main/server/controler/blog/getMessageList.js')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
(async (()=>{
	var s=await(getMessageList({session:{uid:1}}))
	console.log(s)
}))()
