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
	},
	setComment:(data)=>{
        return api.post('/blog/articalComment',{
            data:data
        }).then((res)=>{
            return res
        },(error)=>{
            throw error;
        })
    },
    getComments:(obj)=>{
		return api
			.get('/blog/articalComment',{params:{
				articalId:obj.articalId,
				pageSize:obj.pageSize,
				pageNum:obj.pageNum,
			}})
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	},
	agree:(data)=>{
        return api.post('/blog/setAgree',{
            data:data
        }).then((res)=>{
            return res
        },(error)=>{
            throw error;
        })
    },
}
export default Service;