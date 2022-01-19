import React from "react";
import {router} from "next/client";
import Cookies from "js-cookie";
import axios from "axios";

class StudentCourseCard extends React.Component {

    state = {
        course: this.props.course,
    }

    getCourseDetails = async () => {

        console.log("this.props.course.name")
        console.log(this.state.course)

        return router.push({
            pathname: '/course_details',
            query: {courseId: this.props.course.id}
        })
    };

    optoutStudentFromCourse = async () => {

        console.log('Inside opt out function')
        try {
            let userId = this.props.studentId;
            if (!userId) {
                userId = Cookies.get('userId')
            }
            const courseId = this.state.course.id;

            console.log('userId ' + userId)
            console.log('courseId')
            console.log(courseId)

            const res = await axios.put(`http://localhost:8081/api/students/${userId}/courses/${courseId}`, {}, {
                //get page number programmatically
                headers: {
                    AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
                }
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            });

            // console.log("this.props.studentId inside StudentCourseCard opt out function")
            // console.log(this.props.studentId)

            console.log("gonna optout")
            console.log("userId")
            console.log(userId)
            console.log("should bb pushed to all_courses_of_student page, see the logs")
            // return router.push({
            //     pathname: '/all_courses_of_student',
            //     query: {studentId: userId}
            // })
        } catch (err) {
            console.log(err);
        }
    };


    render() {

        let controls;

        if (Cookies.get('access_token') && Cookies.get('role') === 'student') {
            controls = (
                <div>
                    <button className="btn btn-primary border-4" onClick={this.getCourseDetails}>View Contents</button>
                    <button type="button" className="btn btn-danger border-4"
                            onClick=/*{this.props.optOut(this.state.course.id)}*/{this.optoutStudentFromCourse}
                            disabled={this.state.unenrolled}>
                        Opt Out
                    </button>
                </div>
            )
        } else if (Cookies.get('access_token') && Cookies.get('role') === 'admin') {
            controls = (<button className="btn btn-primary"
                                onClick=/*{this.props.optOut}*/{this.optoutStudentFromCourse}>Opt Out </button>)
        }

        return (
            <div className="border rounded text-uppercase text-center">

                <h1 className="text-xl mb-1">{this.props.course.courseName}</h1>
                <h5 className="text-xl mb-1">some description{/*{this.props.course.courseName}*/}</h5>
                <h6 className="text-sm mb-1">difficulty level : {this.props.course.level}</h6>
                {/*<button className="btn btn-primary">View Contents</button>*/}
                <div>
                    {controls}
                </div>

            </div>

        )
    }

}

export default StudentCourseCard;