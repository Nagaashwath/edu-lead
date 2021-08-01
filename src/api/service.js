import axios from 'axios';
const api=process.env.REACT_APP_ED_API;

export const getStudentList=(body)=>{
return axios.post(api+process.env.REACT_APP_STUDENT_GET, body);
}

export const updateStudent=(body)=>{
    return axios.put(api+process.env.REACT_APP_STUDENT_UPDATE, body);
}

export const getClassList=()=>{
    return axios.get(api+process.env.REACT_APP_CLASS_GET);
    }


export const navMenuList=['Dashboard','Teacher Management','Student Management'];
