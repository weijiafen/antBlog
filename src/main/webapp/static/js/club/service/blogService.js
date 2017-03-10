import api from '../library/axios/api'
const Service={
	getHead:(userid)=>{
		return api
			.get(`/js/club/json/blogInfo${userid}.json`)
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	},
	getList:(userId,typeId)=>{
		return api
			.get(`/js/club/json/blogList${userId}_${typeId}.json`)
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	},
	getArtical:(userId,typeId,articleId)=>{
		return api
			.get(`/js/club/json/blogArtical${articleId}.json`)
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	}
}
export default Service;