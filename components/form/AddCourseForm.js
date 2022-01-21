//import Cookies from 'js-cookie';
import React, {useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {withRouter} from "next/router";

const fileSelectedHandler = (event, setFile) => {
    setFile(event.target.files[0])
}

const handleSubmit = async (course, file, router, teacherId) => {

    event.preventDefault();
    try {
        const userId = Cookies.get('userId');
        const res = await axios.post(`http://localhost:8081/api/teachers/${userId}/courses`, course, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
        const courseId = res.data.id;
        //if course has been added successfully then save course content
        if (res.status && res.status === 200) {
            if (file) {
                console.log('file exists')
            }
            const userId = Cookies.get("userId");
            const data = new FormData()
            data.append('file', file);

            await axios.post(`http://localhost:8081/api/teachers/${userId}/courses/${courseId}/contents`, data, {
                headers: {
                    AUTHORIZATION: 'Bearer ' + Cookies.get('access_token'),
                    'content-type': 'multipart/form-data'
                }
            }).then(res => {
                if (res && res.status === 200) {
                    router.push({
                        pathname: '/all_courses_of_teacher',
                        query: {teacherId: teacherId}
                    })
                } else {
                    console.log("failed to upload course content")
                }
            }).catch(err => console.log(err));
        }
    } catch (err) {
        console.log(err);
    }
}

function AddCourseForm(props) {

    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [file, setFile] = useState();

    return (

        // <form className="text-center" onSubmit={this.handleSubmit}>
        //     <h1 className="h3 mb-3 fw-normal">Upload Course</h1>
        //
        //     <input type="courseName"
        //            name="courseName"
        //            className=""
        //            placeholder="Course Name"
        //            required
        //            size="30"
        //            onChange={this.handleChange}
        //     /><br/>
        //
        //     <input type="description"
        //            name="description"
        //            className=""
        //            placeholder="Description"
        //            required
        //            size="30"
        //            onChange={this.handleChange}
        //     /><br/>
        //
        //     <input type="level"
        //            name="level"
        //            className=""
        //            placeholder="Difficulty 403"
        //            required
        //            size="30"
        //            onChange={this.handleChange}/><br/>
        //
        //     <br/>
        //
        //     <input type="file"
        //            name="file"
        //            className="border rounded position-relative"
        //            placeholder="file"
        //            required
        //            size="30"
        //            onChange={this.fileSelectedHandler}/><br/>
        //
        //     <br/>
        //
        //     <button className="btn btn-lg btn-primary" type="submit">Upload Course</button>
        // </form>


        <div className="container">
            <div className="row ">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    {/*<div className="col-lg-12 login-key">*/}
                    {/*    <i className="fa fa-key" aria-hidden="true"></i>*/}
                    {/*</div>*/}
                    <h1 className="col-lg-12 login-title text-uppercase">
                        Upload Course
                    </h1>

                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form onSubmit={() => handleSubmit(
                                {
                                    courseName: courseName,
                                    description: description,
                                    level: level
                                }, file, props.router, Cookies.get('userId'))}>
                                <div className="form-group mb-3">
                                    <label className="form-control-label">COURSE NAME</label>
                                    <input className="form-control"
                                           type="courseName"
                                           name="courseName"
                                           placeholder="Course Name"
                                           required
                                           onChange={() => setCourseName(event.target.value)}
                                    /></div>
                                <div className="form-group mb-3">
                                    <label className="form-control-label">DESCRIPTION</label>
                                    <input className="form-control"
                                           type="description"
                                           name="description"
                                           placeholder="Description"
                                           required
                                           onChange={() => setDescription(event.target.value)}

                                    /></div>
                                <div className="form-group mb-3">
                                    <label className="form-control-label text-uppercase">Difficulty LEVEL</label>
                                    <input className="form-control"
                                           type="level"
                                           name="level"
                                           placeholder="e.g. 403"
                                           required
                                           onChange={() => setLevel(event.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-control-label text-uppercase">Course Outline</label>
                                    <input className="form-control"
                                           type="file"
                                           name="file"
                                           placeholder="file"
                                           required
                                           onChange={(event) => fileSelectedHandler(event, setFile)}
                                    />
                                </div>
                                <div className="col-lg-12 loginbttm position-relative" type="submit">
                                    <div className="col-lg-6 login-btm login-button">
                                        <button type="submit" className="btn btn-primary position-absolute w-100">
                                            UPLOAD
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>


    );
}

export default withRouter(AddCourseForm);