
var articalComment=require('./src/main/server/controler/blog/articalComment.js')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
(async (()=>{
	var s=await(articalComment('get',{query:{articalId:32}}))
	console.log(s)
}))()
