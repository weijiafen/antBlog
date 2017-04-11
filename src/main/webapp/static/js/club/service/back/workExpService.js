import api from '../../library/axios/api';
const Service = {
	getWorkExp:()=>{
        return api.get('/resume/workExp').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setWorkExp:(data)=>{
        return api.post('/resume/workExp',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteWorkExpItem:(id)=>{
        return api.delete('/resume/workExpItem',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
}
export default Service;