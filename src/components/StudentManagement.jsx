import React,{useState,useEffect} from 'react';
import Pagination from '../common/pagination';
import {paginate} from '../utility/paginate';
import {getStudentList, updateStudent,getClassList} from '../api/service';
import { BiEdit,BiTrashAlt } from "react-icons/bi";
import { FaBan } from "react-icons/fa";
import {Offcanvas,Alert,Navbar,Nav,Container, Card} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FiHome } from "react-icons/fi";

const StudentManagement=(props)=>{

    const [pageSize] = useState(10);
    const [currentPage, setcurrentPage] = useState(1);
    const [studentList, setStudentList] = useState([]);
    const [listLoad, setListLoad] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [classList, setClassList] = useState([]);
    const [currentClass, setCurrentClass] = useState('');
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType,setAlertType]=useState('');
    const [currentStudent,setCurrentStudent]=useState({}); 
    const placement='end'; 

    useEffect(()=>{
        setListLoad(true);
        getInitialData();

    },[]);

    const getInitialData=()=>{
        getStudentList({ "page": "1", "limit": "10"})
          .then(function (response) {
            setListLoad(false);
            setStudentList(response.data.data.docs);
            getClassList()
            .then(function(response){  
                setClassList(response.data.data.classes); 
            })
            .catch(function (error) {
                console.log(error);
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const handleClose = () => {setUpdateLoading(false);setShowAlert(false); setShow(false)};
    const handleShow = (currentStudent) => {setShow(true);
        setShowAlert(false);
        setCurrentStudent({
                            first_name:currentStudent.first_name,
                            last_name:currentStudent.last_name,
                            campus:currentStudent.campus,
                            student_id:currentStudent.student.student_id,
                            dob:currentStudent.student.dob,
                            gender:currentStudent.student.gender,  
                            class_name:currentStudent.student.class_name,
                            email:currentStudent.email,
                            user_id:currentStudent._id,
                            mobile_number:currentStudent.mobile_number,
                            section:currentStudent.student.section,  
                         })};
  
    const handlePageChange=page=>{
    console.log(page);
    setcurrentPage(page);
    }

    const getSection=(list,currentClass)=>{  
                         return   (list.filter((item)=>(item.class_name===currentClass)))[0].section;
    }

    let students=paginate(studentList,currentPage,pageSize);
    return (<React.Fragment>

{           false===listLoad ?( 0<studentList.length?
           (<div className="d-flex flex-column">
               <div className="col-12">

                 <div className="d-flex flex-column">
                              <Card className="menu-header">
                                  <Card.Body><span className="student-header">Student Management</span></Card.Body>
                              </Card>
                                      <Navbar  className="mb-4 " expand="lg">
                                        <Container>
                                            <Navbar.Brand >Student Information</Navbar.Brand>
                                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                            <Navbar.Collapse id="basic-navbar-nav">
                                            <Nav className="me-auto">
                                                <Nav.Link className="home-icon"><FiHome /></Nav.Link>
                                                <Nav.Link>&raquo;</Nav.Link>
                                                <Nav.Link >Student Management</Nav.Link>
                                            </Nav>
                                            </Navbar.Collapse>
                                        </Container>
                                        </Navbar>

                    <div className="d-flex flex-col record-header col-12 justify-content-between">
                               <div className="record-cell col-1 d-flex justify-content-center"><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></div>
                                <div className="record-cell col-1"> STUDENT ID</div>
                                <div className="record-cell col-1"> FIRST NAME</div>
                                <div className="record-cell col-1">  LAST NAME</div>
                                <div className="record-cell col-1">CLASS </div >
                                <div className="record-cell col-1">SECTION</div>        
                                <div className="record-cell col-1" >EMAIL ADDRESS </div>  
                                <div className="record-cell col-1">CAMPUS</div>   
                                <div className="record-cell col-2">ACTIONS </div>              
                    </div>
                    {
                     students.map((student,i)=>{
                           return (
                           <div className="d-flex flex-col record col-12 justify-content-between" key={'stud'+student.student.student_id+i}>
                           <div className="record-cell col-1 d-flex justify-content-center"><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></div>
                           <div className="record-cell col-1">{student.student.student_id}</div>
                           <div className="record-cell col-1">{student.first_name}</div>
                           <div className="record-cell col-1">{student.last_name}</div>
                           <div className="record-cell col-1">{student.student.class_name}</div>
                           <div className="record-cell col-1">{student.student.section}</div>
                           <div className="record-cell col-1">{student.email}</div>
                           <div className="record-cell col-1">{student.campus}</div>
                           <div className="record-cell col-2 d-flex flex-row justify-content-start"> 
                               <div className="edit-student col-2" onClick={()=>{
                                   setCurrentClass(student.student.class_name); 
                                   handleShow(student)}}><BiEdit  /></div> 
                               <div className="ban-student col-2"><FaBan /></div>
                               <div className="delete-student col-2"><BiTrashAlt /></div>   
                            </div>
                            </div>
                          );
                    }) }
              </div>
        </div>
        <div  className="col-12 d-flex justify-content-end ">
        <Pagination 
        itemsCount={studentList.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        /></div>
        </div>):'No Data'
        ):'Loading'}

                <Offcanvas show={show} placement={placement}  scroll="true" onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Edit Student</Offcanvas.Title>
                    </Offcanvas.Header>
                    
                    <Offcanvas.Body>
                                 <Formik
                                        initialValues={{...currentStudent}}
                                        validate={values => {
                                            const errors = {};
                                            if (!values.student_id) {
                                            errors.student_id = 'Required';
                                            } 
                                            if (!values.first_name) {
                                                errors.first_name = 'Required';
                                                } 
                                            if (!values.last_name) {
                                                errors.last_name = 'Required';
                                                }  
                                             if (!values.mobile_number) {
                                                errors.mobile_number = 'Required';
                                                } 
                                            else if (!values.class_name) {
                                                errors.class_name = 'Required';
                                            }
                                            return errors;
                                        }}
                                        onSubmit={(values, { setSubmitting }) => {
                                            //console.log(values);
                                            setUpdateLoading(true);
                                            updateStudent(values).then(function(response){
                                               //console.log(response);
                                               setUpdateLoading(false);
                                                setShowAlert(true);
                                                getInitialData();
                                               setAlertType('success');
                                            }).catch(function(error){
                                                setAlertType('danger');
                                                setShowAlert(true);
                                            });
                                            setSubmitting(false);
                                        }}
                                        >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                <hr />
                                            <label htmlFor="first_name" className="form-label">First Name*</label>
                                            <Field className="form-control" type="text" name="first_name" />
                                            <ErrorMessage className="text-danger" name="first_name" component="div" />

                                            <label htmlFor="last_name" className="form-label mt-3">Last Name*</label>
                                            <Field className="form-control" type="text" name="last_name" />
                                            <ErrorMessage className="text-danger" name="last_name" component="div" />

                                            <label htmlFor="campus" className="form-label mt-3">Campus</label>
                                            <Field className="form-select" component="select" name="campus" >
                                            <option value="Coppell">Coppell</option>
                                            <option value="Hestabit">Hestabit</option>
                                            <option value="Irving">Irving</option>
                                            </Field>

                                            <label htmlFor="student_id" className="form-label mt-3">Student ID*</label>
                                            <Field className="form-control" disabled={true} type="text" name="student_id"  />

                                            
                                            <label htmlFor="dob" className="form-label mt-3">Date of Birth</label>
                                            <Field className="form-control" type="text" name="dob" />

                                            <label htmlFor="gender"className="form-label mt-3" >Gender</label>
                                            <Field className="form-select"  component="select" name="gender" >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            </Field>
                                            <ErrorMessage name="gender" component="div" />

                                            <label htmlFor="email" className="form-label mt-3">Email*</label>
                                            <Field className="form-control" disabled={true} type="text" name="email" />
                                

                                            <label htmlFor="mobile_number" className="form-label mt-3">Mobile No*</label>
                                            <Field className="form-control" type="text" name="mobile_number" />
                                            <ErrorMessage className="text-danger" name="mobile_number" component="div" />

                                            <label htmlFor="class_name" className="form-label mt-3">Class*</label>
                                            <Field value={currentClass} className="form-select" component="select" name="class_name" onChange={(e)=>{
                                                setCurrentClass(e.target.value);
                                            }}>
                                            {
                                                classList.map((classItem)=>{
                                                    return(<option key={'className'+classItem.class_name} value={classItem.class_name}>{classItem.class_name}</option>);
                                                })
                                            }
                                     
                                            </Field>
                                            <ErrorMessage className="text-danger" name="class_name" component="div" />

                                            <label htmlFor="section" className="form-label mt-3">Section</label>
                                            <Field className="form-select "  component="select" name="section" >
                                            {
                                               getSection(classList,currentClass).map((sectionItem)=>{
                                                    return(<option key={'sectionName'+sectionItem.section} value={sectionItem.section}>{sectionItem.section}</option>);
                                                })
                                            }
                                            </Field>
                                            <ErrorMessage className="text-danger " name="section" component="div" />

                                            {showAlert?(<Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible>
                                                        <Alert.Heading>{'danger'===alertType?'Failure':'Success'}</Alert.Heading>
                                                        <p>
                                                        {('danger'===alertType?'Update Unsuccessfull':'Updated Successfully')}
                                                        </p>
                                                    </Alert>):''}
                                            <hr className="mt-5"/>
                                            <button className="btn btn-save m-2 " type="submit" disabled={isSubmitting}>
                                            {true===updateLoading?(<div style={{color:'white'}} className="spinner-border " role="status"></div>):'Save'}
                                            </button>
                                            
                                            <div className="btn btn-cancel m-2" onClick={handleClose}>
                                                Cancel
                                            </div>

                                            </Form>
                                        )}
                                </Formik>
                    </Offcanvas.Body>
                </Offcanvas>

    </React.Fragment>);
}

export default StudentManagement;