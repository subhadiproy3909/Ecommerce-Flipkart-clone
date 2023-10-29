import axios from 'axios';


const url = 'http://localhost:5000';
export const authenticateSignup = async (data) =>{
    try{
        const user = await axios.post(`${url}/auth/signup`, data);
        return user.data;
    }
    catch(err){
        console.log(`authenticateSignup error: ${err.message}`);
    }
}

export const authenticateLogin = async (data) =>{
    try{
        const user = await axios.post(`${url}/auth/login`, data);
        return user.data;
    }
    catch(err){
        console.log(`authenticateLogin error: ${err.message}`);
    }
}