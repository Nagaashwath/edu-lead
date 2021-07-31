import React,{useState} from 'react';
import StudentManagement from './StudentManagement';
import {navMenuList} from '../utility/service';

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
                           navMenuList.map((menuItem)=>(<li key={menuItem+'menu'} className="nav-item" onClick={()=>setCurrentItem(menuItem)}>
                                <span className={menuItem===currentItem?"nav-link active":"nav-link"} aria-current="page">
                                {menuItem}
                                </span>
                            </li>))
                      }
                    </ul>
                </div>
                <div className="d-flex flex-column flex-shrink-0 p-3 col-10 container" >
                    <StudentManagement />
                </div>
      </div>
  </React.Fragment>
  );
 }
  export default Layout;



