import axios from 'axios';
const api=process.env.REACT_APP_ED_API;

export const getStudentList=(body)=>{
return axios.post(api+process.env.REACT_APP_USER_GET, body);
}

export const updateStudent=(body)=>{
    return axios.put(api+process.env.REACT_APP_USER_UPDATE, body);
}

export const navMenuList=['Dashboard','Teacher Management','Student Management'];
