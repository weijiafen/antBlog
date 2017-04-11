import api from '../../library/axios/api';
const Service = {
     getTop:()=>{
        return api.get('/resume/userTop').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setTop:(data)=>{
        return api.post('/resume/userTop',{
            data:data
        }).then((res)=>{
            return res
        },(error)=>{
            throw error;
        })
    },
}
export default Service;