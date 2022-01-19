import React from "react";
import {withRouter} from "next/router";
import {router} from "next/client";
import {deactivateUser} from "../lib/auth";

class StudentListItem extends React.Component {

    state = {
        student: this.props.student,
    }

    deactivate = async () => {
        return await deactivateUser(this.state.student.id, "student");
    }

    getAllCoursesOfStudent = async () => {
        console.log("student id being pushed...")
        console.log(this.props.student.id)
        await router.push({
            pathname: '/all_courses_of_student',
            query: {studentId: this.props.student.id}
        })
    };


    render() {
        return (
            <div className="border rounded position-relative text-center">

                <h1 className="mb-1 position-relative ">{this.props.student.firstName} {this.props.student.lastName}</h1>
                <button className="btn btn-primary" onClick={this.getAllCoursesOfStudent}> View Courses
                </button>
                <button className="btn btn-primary" onClick={this.deactivate}> Deactivate
                </button>
            </div>
        )
    }
}

export default withRouter(StudentListItem);