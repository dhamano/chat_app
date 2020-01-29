import axios from 'axios';
import axiosWithAuth from '../utilities/axiosWIthAuth';

const host = process.env.BASE_HOST || 'http://localhost:8000';

// module.exports = {
//     login,
//     register
// }

export const register = async (userCred) => {
    let { username, password } = userCred;
    if (!username && !password) return { message: 'username and password require' };
    if (!username) return { message: 'username required' };
    if (!password) return { message: 'password required' };
    return await axios.post(`${host}/auth/register`, userCred)
                        .then( res => {
                            console.log(res);
                            return res;
                        })
                        .catch( err => {
                            console.log("ERROR",err);
                            console.error(err);
                            return err;
                        })

}

export const login = async (userCred) => {
    console.log('host',host);
    console.log("USER CREDENTIALS", userCred);
    let { username, password } = userCred;
    if (!username && !password) return { message: 'username and password require' };
    if (!username) return { message: 'username required' };
    if (!password) return { message: 'password required' };
    console.log('past checks');
    return await axios.post(`${host}/auth/login`, userCred)
                        .then( res => {
                            console.log(res);
                            return res;
                        })
                        .catch( err => {
                            console.log("ERROR",err);
                            console.error(err);
                            return err;
                        })

}