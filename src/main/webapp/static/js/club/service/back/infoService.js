import api from '../../library/axios/api';
const Service = {
	getPersonalInfo:()=>{
        return api.get('/resume/personalInfo').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setPersonalInfo:(data)=>{
        return api.post('/resume/personalInfo',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
}
export default Service;