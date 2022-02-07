import Login from "../login";
import React from "react";
import StudentHome from "../../components/Home/StudentHome";
import TeacherHome from "../../components/Home/TeacherHome";
import AdminHome from "../../components/Home/AdminHome";
import axios from "axios";
import getConfig from 'next/config'
import {serverRuntimeConfig} from "../../next.config";
import {getEnrolledCoursesOfStudent} from "../../lib/lib";
import Cookies from "js-cookie";
import AllCoursesOfStudent from "../all_courses_of_student";
import AllCoursesOFTeacher from "../all_courses_of_teacher";
import AllCoursesAdmin from "../all_courses_admin";

export default function HomeComponent(props) {

    let content;
    console.log('props.role')
    console.log(props.role)
    if (props.role === 'student') {
        //content = getEnrolledCoursesOfStudent(Cookies.get('userId'), 0);
        content = <AllCoursesOfStudent studentId={Cookies.get('userId')}/>
        //content = <StudentHome courses={props.courses}/>
    } else if (props.role === 'teacher') {
        //content = <TeacherHome/>
        content = <AllCoursesOFTeacher teacherId={Cookies.get('userId')}/>
    } else if (props.role === 'admin') {
        //content = <AdminHome/>
        content = <AllCoursesAdmin/>
    } else {
        content = <Login/>
    }
    return (
        <div>
            {content}
        </div>
    );
}

export const getServerSideProps = async (context) => {
    const {req} = context;
    const role = getCookie(req.headers.cookie, 'role');
    const access_token = getCookie(req.headers.cookie, 'access_token');
    console.log(role)
    console.log(access_token)
    console.log('serverRuntimeConfig.serverBaseUrl')
    console.log(serverRuntimeConfig.serverBaseUrl)
    let courses = await axios.get(serverRuntimeConfig.serverBaseUrl + '/api/courses', {
        params: {
            page: 0
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + access_token
        }
    }).then(res => {
        console.log(res.data.content)
        return res.data.content
    }).catch(err => console.log("Error ", err));

    console.log('courses')
    console.log(courses)

    return {
        props: {
            role: role,
            courses: courses
        }
    }
}


const getCookie = (reqCookie, name) => {
    let cookies = {}
    reqCookie && reqCookie.split(';').forEach(cookie => {
        let parts = cookie.split('=')
        cookies[parts[0].trim()] = (parts[1] || '').trim()
        return
    })
    return cookies[name] || null
}