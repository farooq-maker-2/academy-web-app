import React, {useEffect, useState} from "react";
import {router} from "next/client";
import Cookies from "js-cookie";
import axios from "axios";
import {enrollStudentToCourse} from "../../lib/auth";

const getCourseDetails = async (courseId) => {
    await router.push({
        pathname: '/course_details',
        query: {courseId: courseId}
    })
};

const enroll = async (courseId, setEnrolled) => {
    const status = await enrollStudentToCourse(courseId);
    if (status === 200) {
        setEnrolled(true);
    }
}

const deleteCourse = async () => {
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

function CourseCard(props) {

    const [course, setCourse] = useState({});
    const [enrolled, setEnrolled] = useState(false);

    useEffect(() => {
        setCourse(props.course)
    }, []);

    let controls;
    if (Cookies.get('access_token') && Cookies.get('role') === 'teacher') {
        controls = (
            <button className="btn btn-primary" onClick={() => getCourseDetails(course.id)}>View & Add
                Contents</button>)
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'admin') {
        controls = (<button className="btn btn-primary" onClick={deleteCourse}>Delete Course</button>)
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'student') {
        controls = (
            <button className="btn btn-success" onClick={() => enroll(course.id, setEnrolled)}
                    disabled={enrolled}>Enroll This Course</button>)
    }

    return (
        <div className="border rounded text-uppercase text-center">

            <h1 className="text-xl mb-1">{course.courseName}</h1>
            <h5 className="text-xl mb-1">{course.description}</h5>
            <h6 className="text-sm mb-1">difficulty level : {course.level}</h6>
            <div>
                {controls}
            </div>
        </div>
    )
}
export default CourseCard;