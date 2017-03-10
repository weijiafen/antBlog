import api from '../library/axios/api';
const Service = {
	getUser:()=>{
		return api
			.get('/js/club/json/userList.json')
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	}
}
export default Service;