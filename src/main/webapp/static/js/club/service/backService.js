import api from '../library/axios/api';
const Service = {
	 login: (detail) => {
        return api
            .post('/login?userName=wadeq', {
                data: detail,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
}
export default Service;