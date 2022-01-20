//import Cookies from 'js-cookie';
import React from "react";
import {RegisterUser} from '../../lib/auth';
import Cookies from "js-cookie";
import axios from "axios";
import {withRouter} from "next/router";

class AddCourseForm extends React.Component {

    state = {
        courseName: '',
        description: '',
        level: '',
        file: '',
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state);
    }

    fileSelectedHandler = event => {

        const {courseName, description, level, file} = this.state;
        const updatedState = {
            courseName,
            description,
            level,
            file: event.target.files[0]
        }
        this.setState(updatedState)
        console.log(this.state);
    }

    handleSubmit = async (event) => {

        event.preventDefault();

        console.log('Inside upload content function')
        try {
            const userId = Cookies.get('userId');
            console.log('userId ' + userId)
            const {courseName, description, level, file} = this.state;

            const res = await axios.post(`http://localhost:8081/api/teachers/${userId}/courses`, {
                courseName,
                description,
                level
            }, {
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

                const data = new FormData()
                const userId = Cookies.get("userId");
                data.append('file', file/*this.state.file*//*, file.name*/);

                await axios.post(`http://localhost:8081/api/teachers/${userId}/courses/${courseId}/contents`, data, {
                    headers: {
                        AUTHORIZATION: 'Bearer ' + Cookies.get('access_token'),
                        'content-type': 'multipart/form-data'
                    }
                }).then(res => {
                    if (res && res.status === 200) {
                        console.log("success")
                        console.log(res)
                        this.props.router.push({
                            pathname: '/all_courses_of_teacher',
                            query: {teacherId: this.props.teacherId}
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

    render() {

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
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label className="form-control-label">COURSE NAME</label>
                                        <input className="form-control"
                                               type="courseName"
                                               name="courseName"
                                               placeholder="Course Name"
                                               required
                                               onChange={this.handleChange}
                                        /></div>
                                    <div className="form-group mb-3">
                                        <label className="form-control-label">DESCRIPTION</label>
                                        <input className="form-control"
                                               type="description"
                                               name="description"
                                               placeholder="Description"
                                               required
                                               onChange={this.handleChange}

                                        /></div>
                                    <div className="form-group mb-3">
                                        <label className="form-control-label text-uppercase">Difficulty LEVEL</label>
                                        <input className="form-control"
                                               type="level"
                                               name="level"
                                               placeholder="e.g. 403"
                                               required
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-control-label text-uppercase">Course Outline</label>
                                        <input className="form-control"
                                               type="file"
                                               name="file"
                                               placeholder="file"
                                               required
                                               onChange={this.fileSelectedHandler}
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

}

export default withRouter(AddCourseForm);