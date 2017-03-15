
var resume=require('./src/main/server/controler/resume.js')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
(async (()=>{
	var s=await(resume({id:1}))
	console.log(s)
}))()
