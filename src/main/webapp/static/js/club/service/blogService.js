import api from '../library/axios/api'
const Service={
	getHead:(userid)=>{
		return api
			.get('/blog/getHead',{params:{userId:userid}})
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	},
	getList:(data)=>{
		return api
			.get('/blog/getArticalList',{params:{
				menuId:data.menuId,
				userId:data.userId,
				categoryId:data.categoryId,
				pageNum:data.pageNum,
				pageSize:data.pageSize
			}})
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	},
	getArtical:(articalId)=>{
		return api
			.get('/blog/ArticalDetail',{params:{id:articalId,type:1}})
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	}
}
export default Service;