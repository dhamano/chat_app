import axios from 'axios';
import axiosWithAuth from '../utilities/axiosWIthAuth';

const host = process.env.BASE_HOST || 'localhost:8000';

modules.exports = {
    login
}

async function register(userCred) {
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

async function login(userCred) {
    let { username, password } = userCred;
    if (!username && !password) return { message: 'username and password require' };
    if (!username) return { message: 'username required' };
    if (!password) return { message: 'password required' };
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