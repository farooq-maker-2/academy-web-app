import React from "react";
import Cookies from "js-cookie";
import Login from "../../pages/login";
import StudentHome from "../../pages/student_home";
import TeacherHome from "../../pages/teacher_home";

class HomeComponent extends React.Component {

    state = {
        access_token: Cookies.get("access_token"),
        refresh_token: Cookies.get("refresh_token"),
        userId: Cookies.get("userId"),
        role: Cookies.get("role"),
    }

    routeToUserComponent() {

        let content;

        if (this.state.role === 'student') {
            content = <StudentHome/>
        } else if (this.state.role === 'teacher') {
            content = <TeacherHome/>
        } else if (this.state.role === 'admin') {
            content = <h1>Admin Home</h1>
        } else {
            content = <Login/>
        }
        return content;
    }

    render() {
        return (
            <div>
                {this.routeToUserComponent()}
            </div>
        );
    }

}

export default HomeComponent;