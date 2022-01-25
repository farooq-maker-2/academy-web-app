import {useRouter} from "next/router";
import Login from "../login";
import React from "react";
import {getAllCourses} from "../../lib/lib";
import StudentHome from "../../components/Home/StudentHome";
import TeacherHome from "../../components/Home/TeacherHome";
import AdminHome from "../../components/Home/AdminHome";

export default function HomeComponent(props) {

    const router = useRouter();

    let content;
    console.log('props.role')
    console.log(props.role)
    if (props.role === 'student') {
        content = <StudentHome courses={props.courses}/>
    } else if (props.role === 'teacher') {
        content = <TeacherHome/>
    } else if (props.role === 'admin') {
        content = <AdminHome/>
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
    const {req, res} = context;
    const role = (req.headers.cookie.split('role=')[1])
    let courses = await getAllCourses(0).then(res => {
        return res.data.content
    }).catch(err => console.log("Error ", err));
    return {
        props: {
            role: role,
            courses: courses
        }
    }
}