
var getInfo=require('./src/main/server/controler/getInfo.js')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
(async (()=>{
	var s=await(getInfo({session:{uid:1}}))
	console.log(s)
}))()
