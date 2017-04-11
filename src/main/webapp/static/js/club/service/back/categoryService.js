import api from '../../library/axios/api';
const Service = {
	getCategory:()=>{
        return api.get('/blog/getCategory').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteMenu:(id)=>{
        return api.delete('/blog/deleteMenu',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteCategory:(id)=>{
        return api.delete('/blog/deleteCategory',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setCategory:(data)=>{
        return api.post('/blog/getCategory',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
}
export default Service;