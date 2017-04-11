import api from '../../library/axios/api';
const Service = {
     getMessageList:(data)=>{
        return api
            .get('/blog/getMessageList',{params:{
                pageSize:data.pageSize,
                pageNum:data.pageNum
            }})
            .then((res)=>{
                return res
            },(res)=>{
                throw new Error(res.msg)
            })
    },
}
export default Service;