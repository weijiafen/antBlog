
var articalList=require('./src/main/server/controler/blog/getArtical.js')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
(async (()=>{
	var s=await(articalList({session:{uid:1},query:{menuId:0}}))
	console.log(s)
}))()
