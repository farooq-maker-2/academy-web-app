import React, {useState} from "react";
import Cookies from "js-cookie";
import {fileSelectedHandler} from "../../lib/lib";
import axios from "axios";
import {publicRuntimeConfig} from "../../next.config";
import {useRouter} from "next/router";

const handleSubmit = async (course, file, router, teacherId) => {

    event.preventDefault();
    try {

        const userId = Cookies.get('userId');
        await axios.post(publicRuntimeConfig.serverBaseUrl + `/api/teachers/${userId}/courses`, course, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        }).then(res => {
            //if course has been added successfully then save course content
            if (res && res.data.success && res.data.success === true) {
                const userId = Cookies.get("userId");
                const data = new FormData()
                data.append('file', file);
                const courseId = res.data.data.id;
                axios.post(publicRuntimeConfig.serverBaseUrl + `/api/teachers/${userId}/courses/${courseId}/contents`, data, {
                    headers: {
                        AUTHORIZATION: 'Bearer ' + Cookies.get('access_token'),
                        'content-type': 'multipart/form-data'
                    }
                }).then(res => {
                    if (res.data.success && res.data.success === true) {
                        window.alert('course uploaded successfully')
                        router.push({
                            pathname: '/all_courses_of_teacher',
                            query: {teacherId: teacherId}
                        })
                    } else {
                        window.alert('failed to upload course')
                    }
                }).catch(err => console.log(err));
            } else {
                window.alert("failed to upload course")
            }
        })
    } catch (err) {
        console.log(err);
    }
}

export default function AddCourse() {
    const router = useRouter();
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [file, setFile] = useState();

    return (
        <div className="container">
            <div className="row ">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
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
                                }, file, router, Cookies.get('userId'))}>
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
                                    /></div>
                                <div className="form-group mb-3">
                                    <label className="form-control-label text-uppercase">Course Outline</label>
                                    <input className="form-control"
                                           type="file"
                                           name="file"
                                           placeholder="file"
                                           required
                                           onChange={(event) => fileSelectedHandler(event, setFile)}
                                    /></div>
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
