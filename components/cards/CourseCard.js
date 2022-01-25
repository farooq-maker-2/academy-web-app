import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {deleteCourse, enrollStudentToCourse} from "../../lib/lib";
import {useRouter} from "next/router";

function CourseCard(props) {
    const [course, setCourse] = useState({});
    const [enrolled, setEnrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setCourse(props.course)
    }, []);

    let controls;
    if (Cookies.get('access_token') && Cookies.get('role') === 'teacher') {
        controls = (
            <button className="btn btn-primary" onClick={() => {
                return router.push({
                    pathname: '/course_details',
                    query: {courseId: course.id}
                })
            }}>View & Add Contents</button>)
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'admin') {
        controls = (
            <button className="btn btn-primary"
                    onClick={() => deleteCourse(props.courses, props.course.id, props.setCourses)}>
                Delete Course
            </button>)
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'student') {
        controls = (
            <button className="btn btn-success"
                    onClick={() => enrollStudentToCourse(course.id).then(res => {
                        if (res.status === 200) {
                            setEnrolled(true);
                        }
                    })}
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