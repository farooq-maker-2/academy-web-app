import {useRouter} from "next/router";
import Login from "../login";
import React from "react";
import AdminHome from "../admin_home";

export default function HomeComponent(props) {

    const router = useRouter();

    let content;
    console.log('props.role')
    console.log(props.role)
    if (props.role === 'student') {
        router.push('/student_home')
        //content = <StudentHome/>
    } else if (props.role === 'teacher') {
        router.push('/teacher_home')
        //content = <TeacherHome/>
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
    return {
        props: {
            role: role
        }
    }
}