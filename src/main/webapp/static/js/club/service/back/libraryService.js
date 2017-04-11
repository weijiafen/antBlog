import api from '../../library/axios/api';
const Service = {
    getLibrary:()=>{
        return api.get('/resume/library').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setLibrary:(data)=>{
        return api.post('/resume/library',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteLibraryItem:(id)=>{
        return api.delete('/resume/libraryItem',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
}
export default Service;

