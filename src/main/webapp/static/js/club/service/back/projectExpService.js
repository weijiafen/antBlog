import api from '../../library/axios/api';
const Service = {
    getProjectExp:()=>{
        return api.get('/resume/projectExp').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setProjectExp:(data)=>{
        return api.post('/resume/projectExp',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteProjectExpItem:(id)=>{
        return api.delete('/resume/projectExpItem',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteProjectExpItemDes:(id)=>{
        return api.delete('/resume/projectExpItemDes',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
}
export default Service;