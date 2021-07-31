import React,{useState,useEffect} from 'react';
import Pagination from '../common/pagination';
import {paginate} from '../utility/paginate';
import {getStudentList, updateStudent} from '../utility/service';
import { BiEdit,BiTrashAlt } from "react-icons/bi";
import { FaBan } from "react-icons/fa";
import {Offcanvas} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const StudentManagement=()=>{

    const [pageSize] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [studentList, setStudentList] = useState([]);
    const [listLoad, setListLoad] = useState(false);
    const [show, setShow] = useState(false);
    const [currentStudent,setCurrentStudent]=useState({}); 
    const placement='end'; 

    useEffect(()=>{
        setListLoad(true);
        getStudentList({ "page": "1", "limit": "10"})
          .then(function (response) {
            setListLoad(false)
            setStudentList(response.data.data.docs);
          })
          .catch(function (error) {
            console.log(error);
          });

    },[]);

    const handleClose = () => setShow(false);
    const handleShow = (currentStudent) => {setShow(true);
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

    let students=paginate(studentList,currentPage,pageSize);
    return (<React.Fragment>

{           false===listLoad ?( 0<studentList.length?
           (<div className="d-flex flex-column">
               <div className="col-12">


                 <div className="d-flex flex-column">
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
                           <div className="record-cell col-2 d-flex flex-row justify-content-around"> 
                               <div className="edit-student " onClick={()=>handleShow(student)}><BiEdit  /></div> 
                               <div className="ban-student"><FaBan /></div>
                               <div className="delete-student"><BiTrashAlt /></div>   
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
                                            console.log(values)
                                            updateStudent(values).then(function(response){
                                               console.log(response)
                                                setSubmitting(false);
                                            }).catch(function(error){
                                                console.log(error);
                                            });
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
                                            <Field className="form-select" component="select" name="class_name" >
                                            <option value="II">II</option>
                                            <option value="III">III</option>
                                            <option value="IV">IV</option>
                                            <option value="V">V</option>
                                            <option value="VI">VI</option>
                                            <option value="VII">VII</option>
                                            <option value="VIII">VIII</option>
                                            <option value="IX">IX</option>
                                            <option value="X">X</option>
                                            <option value="XI">XI</option>
                                            <option value="XII">XII</option>
                                            </Field>
                                            <ErrorMessage className="text-danger" name="class_name" component="div" />

                                            <label htmlFor="section" className="form-label mt-3">Section</label>
                                            <Field className="form-select "  component="select" name="section" >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="E">E</option>
                                            <option value="F">F</option>
                                            <option value="G">G</option>
                                            </Field>
                                            <ErrorMessage className="text-danger " name="section" component="div" />
                                            <hr className="mt-5"/>
                                            <button className="btn btn-save m-2 " type="submit" disabled={isSubmitting}>
                                                Save
                                            </button>
                                            
                                            <button className="btn btn-cancel m-2" onClick={handleClose}>
                                                Cancel
                                            </button>
                                            </Form>
                                        )}
                                </Formik>
                    </Offcanvas.Body>
                </Offcanvas>
    </React.Fragment>);
}

export default StudentManagement;