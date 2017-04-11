import api from '../../library/axios/api';
const Service = {
	 getSkills:()=>{
        return api.get('/resume/skills').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setSkills:(data)=>{
        return api.post('/resume/skills',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
}
export default Service;