import api from '../library/axios/api';
const Service = {
	 getEmailCaptcha: (account) => {
        return api
            .get('/emailCaptcha', {
                params: {
                	account:account
                }
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    setEmailCaptcha: (data) => {
        return api
            .post('/emailCaptcha', {
                data:data
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    modifyPassword:(data) => {
        return api
            .post('/modifyPassword', {
                data:data
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