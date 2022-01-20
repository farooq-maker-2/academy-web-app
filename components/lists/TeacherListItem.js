import React from "react";
import {withRouter} from "next/router";
import {router} from "next/client";
import Cookies from "js-cookie";
import {deactivateUser} from "../../lib/auth";

class TeacherListItem extends React.Component {

    state = {
        teacher: this.props.teacher,
    }

    getAllCoursesOfTeacher = async () => {
        await router.push({
            pathname: '/all_courses_of_teacher',
            query: {teacherId: this.props.teacher.id}
        })
    };

    deactivate = async () => {
        await deactivateUser(this.state.teacher.id, "teacher");
    }

    render() {
        let controls;
        if (Cookies.get("role") && Cookies.get("role") === 'admin') {
            controls = (
                <div>
                    <button className="btn btn-primary" onClick={this.getAllCoursesOfTeacher}> View Courses
                    </button>
                    <button className="btn btn-primary" onClick={this.deactivate}> Deactivate
                    </button>
                </div>);
        } else if (Cookies.get("role") && Cookies.get("role") === 'student') {
            controls = (
                <div>
                    <button className="btn btn-primary" onClick={this.getAllCoursesOfTeacher}> View Courses
                    </button>
                </div>);
        }
        return (
            <div className="border rounded position-relative text-center">

                <h1 className="mb-1 position-relative ">{this.props.teacher.firstName} {this.props.teacher.lastName}</h1>
                {controls}
            </div>
        )
    }
}

export default withRouter(TeacherListItem);