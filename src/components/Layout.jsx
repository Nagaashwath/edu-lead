import React,{useState} from 'react';
import StudentManagement from './StudentManagement';
import TeacherManagement from './TeacherManagement';
import Dashboard from './Dashboard';
import { FiUsers,FiHome,FiBook } from "react-icons/fi";
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";

const navMenuList=[
    {path:'/',icon:()=>(<FiUsers />),name:'Student Management'},
    {path:'/dashboard',icon:()=>(<FiHome />),name:'Dashboard'},
    {path:'/teacher',icon:()=>(<FiBook />),name:'Teacher Management'} 
];
const Layout =(props)=>{
    const [currentItem, setCurrentItem] = useState(navMenuList[0]);

    return (  
        <React.Fragment>
            <div className="d-flex flex-col" style={{height:'100%',wordWrap:'wrap-word'}} >
                    <div className="d-flex flex-column flex-shrink-0 p-3 col-2 side-bar" >
                    <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <span className="fs-4">EDUCATION LEADS</span>
                    </span>
                    <ul className="nav nav-pills flex-column mb-auto">
                        {
                           navMenuList.map((menuItem)=>(<li key={menuItem.name+'menu'} className="nav-item" onClick={()=>setCurrentItem(menuItem)}>
                                <Link to={menuItem.path} className={menuItem.name===currentItem.name?"nav-link active d-flex align-items-center":"nav-link d-flex align-items-center "} aria-current="page">
                                           <React.Fragment>{menuItem.icon()}</React.Fragment> <div className="menu-name">{ menuItem.name}</div>
                                </Link>
                            </li>))
                      }
                    </ul>
                </div>
                <div className="d-flex flex-column flex-shrink-0 p-3 col-10 container-ed " >
                <Switch>
                    <Route exact path="/">
                    <StudentManagement />
                    </Route>
                    <Route  path="/dashboard">
                    <Dashboard />
                    </Route>
                    <Route  path="/teacher">
                    <TeacherManagement />
                    </Route>
                </Switch> 
                </div>
      </div>
  </React.Fragment>
  );
 }
  export default Layout;



