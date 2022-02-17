import Login from "../login";
import React from "react";
import {serverRuntimeConfig} from "../../next.config";
import Cookies from "js-cookie";
import AllCoursesOfStudent from "../all_courses_of_student";
import AllCoursesOFTeacher from "../all_courses_of_teacher";
import axios from "axios";
import AllCourses from "../all_courses";

export default function HomeComponent(props) {

    let content;
    if (props.role === 'student') {
        content = <AllCoursesOfStudent studentId={Cookies.get('userId')}/>
    } else if (props.role === 'teacher') {
        content = <AllCoursesOFTeacher teacherId={Cookies.get('userId')}/>
    } else if (props.role === 'admin') {
        content = <AllCourses/>
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
    let courses = await axios.get(serverRuntimeConfig.serverBaseUrl + '/api/courses', {
        params: {
            page: 0
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + access_token
        }
    }).then(res => {
        return res.data.data.content
    }).catch(err => console.log("Error ", err));

    return {
        props: {
            role: role,
            courses: courses ? courses : null
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