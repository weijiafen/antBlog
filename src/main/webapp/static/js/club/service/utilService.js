import axios from 'axios';
import 'babel-polyfill';
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60 * 5
})

const Service={
	getCaptcha:(data)=>{
        return api
            .get('/captcha')
            .then((res)=>{
                return res
            },(res)=>{
                throw new Error(res.msg)
            })
    },
}
export default Service