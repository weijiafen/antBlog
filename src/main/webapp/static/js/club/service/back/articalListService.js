import api from '../../library/axios/api';
const Service = {
	getCategory:()=>{
        return api.get('/blog/getCategory').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getArticalList:(data)=>{
        return api.get('/blog/getArticalList',{params:{
            menuId:data.menuId,
            categoryId:data.categoryId,
            pageSize:data.pageSize,
            pageNum:data.pageNum
        }}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
     removeArtical:(id)=>{
        return api.delete('/blog/ArticalDetail',{params:{
            id:id
        }}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
}
export default Service;