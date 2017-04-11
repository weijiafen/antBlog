import api from '../../library/axios/api';
const Service = {
	getCategory:()=>{
        return api.get('/blog/getCategory').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setArticalDetail:(data)=>{
        return api.post('/blog/ArticalDetail',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getArticalDetail:(id)=>{
        return api.get('/blog/ArticalDetail',{params:{
            id:id
        }}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
}
export default Service;