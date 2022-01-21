import React from "react";
import Cookies from "js-cookie";
import Login from "../../pages/login";
import StudentHome from "../../pages/student_home";
import TeacherHome from "../../pages/teacher_home";

function HomeComponent() {
    let content;
    let role = Cookies.get("role");
    if (role === 'student') {
        content = <StudentHome/>
    } else if (role === 'teacher') {
        content = <TeacherHome/>
    } else if (role === 'admin') {
        content = <h1>Admin Home</h1>
    } else {
        content = <Login/>
    }
    return (
        <div>
            {content}
        </div>
    );
}

export default HomeComponent;