import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import StudentCourseCard from "../cards/StudentCourseCard";
import {router} from "next/client";

class AllCoursesOfStudent extends React.Component {

    state = {
        courses: [],
        pageIndex: 0
    }

    componentDidMount() {
        console.log("component did mount")
        this.getEnrolledCoursesOfStudent();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps', nextProps)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate', nextProps)
        return true;
    }

    getEnrolledCoursesOfStudent = async () => {

        console.log('inside Enrolled Courses Of Student Component')
        let userId = this.props.studentId;
        if (!userId) {
            userId = Cookies.get('userId')
        }
        await axios.get(`http://localhost:8081/api/students/${userId}/courses`,
            {
                params: {
                    page: this.state.pageIndex
                },
                headers: {
                    AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
                }
            }).then(res => {
            console.log("gonna update state")
            console.log(res.data)
            this.setState({
                courses: res.data
            })
            console.log('this.state')
            console.log(this.state)
        }).catch(err => console.log("Error ", err));
    };

    // optOutHandler = async (courseId) => {
    //
    //     console.log('Inside opt out function')
    //     console.log(courseId)
    //     try {
    //         let userId = this.props.studentId;
    //         if (!userId) {
    //             userId = Cookies.get('userId')
    //         }
    //         //const courseId = this.state.course.id;
    //         console.log('userId ' + userId)
    //         console.log('courseId ' + courseId)
    //         const res = await axios.put(`http://localhost:8081/api/students/${userId}/courses/${courseId}`, {}, {
    //             //get page number programmatically
    //             headers: {
    //                 AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
    //             }
    //         });
    //
    //         console.log("this.props.studentId inside StudentCourseCard opt out function")
    //         console.log(this.props.studentId)
    //
    //         console.log("gonna optout")
    //         console.log("userId")
    //         console.log("should bb pushed to all_courses_of_student page, see the logs")
    //         // return router.push({
    //         //     pathname: '/all_courses_of_student',
    //         //     query: {studentId: userId}
    //         // })
    //         this.getEnrolledCoursesOfStudent();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    updateAndFetch = async (courses, updatedIndex) => {
        await this.setState({
            courses: courses,
            pageIndex: updatedIndex
        })
        return this.getEnrolledCoursesOfStudent();
    }

    render() {

        const courses = this.state.courses?.map((course) => (
            <div key={course.id}>
                <StudentCourseCard
                    course={course}
                    studentId={this.props.studentId}
                    /*optOut={this.optOutHandler}*/
                />
            </div>
        ));

        return (
            <div>
                <h1>Your Courses</h1>

                <div>
                    <ul className="list-group list-group-flush">
                        {courses}
                    </ul>
                </div>
                {/*<div className="position-relative bottom-0 end-50">*/}
                <button className="btn btn-primary"
                        onClick={() => this.updateAndFetch(this.state.courses, this.state.pageIndex - 1)}>Previous
                </button>
                <button className="btn btn-primary"
                        onClick={() => this.updateAndFetch(this.state.courses, this.state.pageIndex + 1)}>Next Page
                </button>
                {/*</div>*/}

            </div>);
    }

}

export default AllCoursesOfStudent;