import api from '../library/axios/api';
const Service = {
	 login: (detail) => {
        return api
            .post('/login', {
                data: detail,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    logOff:()=>{
        return api.post('/logOff').then((res)=>{
            return res
        },(error)=>{
            throw error;
        })
    },
    register:(detail)=>{
        return api.post('/register',{
            data:detail
        }).then((res)=>{
            return res
        },(error)=>{
            throw error;
        })
    },
    upload:(data)=>{
        return api.post('/upload',{
            data:data
        },{headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
            return res
        },(error)=>{
            throw error;
        })
    },
   
    getInfo:()=>{
        return api.get('/back/getInfo').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
}
export default Service;