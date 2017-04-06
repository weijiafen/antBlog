import api from '../library/axios/api';
const Service = {
	getUser:()=>{
		return api
			// .get('/js/club/json/userList.json')
			.get('/getUserList')
			.then((res)=>{
				return res
			},(res)=>{
				throw new Error(res.msg)
			})
	}
	// getNode:()=>{
	// 	return api
	// 		.get('/blog/list/1')
	// 		.then((res)=>{
	// 			return res
	// 		},(res)=>{
	// 			throw new Error(res.msg)
	// 		})
	// }
}
export default Service;