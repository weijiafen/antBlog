import api from '../library/axios/api';
const Service = {
	getUserInfo:(id)=>{
		return api
			.get(`/js/club/json/userInfo${id}.json`)
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	},
	isLogin:()=>{
		return api
			.get(`/isLogin`)
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	}
}
export default Service;