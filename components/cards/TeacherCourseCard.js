import React from "react";
import {router} from "next/client";
import Cookies from "js-cookie";
import axios from "axios";
import {enrollStudentToCourse} from "../../lib/auth";

class TeacherCourseCard extends React.Component {

    state = {
        course: this.props.course,
        enrolled: false
    }

    getCourseDetails = async () => {
        console.log("this.props.course.name")
        console.log(this.state.course)

        await router.push({
            pathname: '/course_details',
            query: {courseId: this.props.course.id}
        })
    };

    enrollStudentToCourse = async () => {
        const status = await enrollStudentToCourse(this.props.course.id);
        if (status === 200) {
            // another way to make a new copy
            const {course} = this.state;
            const updatedState = {
                course,
                enrolled: true
            }
            this.setState(updatedState);
        }
    };

    deleteCourse = async () => {
        console.log("delete course function:");
        const courseId = this.state.course.id;
        return await axios.delete(`http://localhost:8081/api/courses/${courseId}`, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        }).then(res => {

            console.log(res.data);

        }).catch(err => console.log("Error ", err));

        console.log("id coming from teacher course card")
        console.log(this.props.teacherId)

        await router.push({
            pathname: '/all_courses_of_teacher',
            query: {teacherId: this.props.teacherId}
        })
    }

    render() {

        let controls;

        if (Cookies.get('access_token') && Cookies.get('role') === 'teacher') {
            controls = (
                <button className="btn btn-primary" onClick={this.getCourseDetails}>View & Add Contents</button>)
        } else if (Cookies.get('access_token') && Cookies.get('role') === 'admin') {
            controls = (<button className="btn btn-primary" onClick={this.deleteCourse}>Delete Course</button>)
        } else if (Cookies.get('access_token') && Cookies.get('role') === 'student') {
            controls = (
                <button className="btn btn-success" onClick={this.enrollStudentToCourse}
                        disabled={this.state.enrolled}>Enroll This Course</button>)
        }

        return (
            <div className="border rounded text-uppercase text-center">

                <h1 className="text-xl mb-1">{this.props.course.courseName}</h1>
                <h5 className="text-xl mb-1">some description{/*{this.props.course.courseName}*/}</h5>
                <h6 className="text-sm mb-1">difficulty level : {this.props.course.level}</h6>
                <div>
                    {controls}
                </div>
            </div>

        )
    }
}

export default TeacherCourseCard;