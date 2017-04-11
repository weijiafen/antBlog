import api from '../../library/axios/api';
const Service = {
	getCompetitions:()=>{
        return api.get('/resume/competitions').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setCompetitions:(data)=>{
        return api.post('/resume/competitions',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteCompetitionsItem:(id)=>{
        return api.delete('/resume/competitionsItem',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
}
export default Service;