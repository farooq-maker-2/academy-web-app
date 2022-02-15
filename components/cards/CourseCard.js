import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {deleteCourse, enrollStudentToCourse} from "../../lib/lib";
import {useRouter} from "next/router";

function CourseCard(props) {
    const [course, setCourse] = useState(props.course);
    //const [courses, setCourses] = useState(props.courses);
    const [enrolled, setEnrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setCourse(props.course)
    }, [props.courses]);

    let controls;
    if (Cookies.get('access_token') && Cookies.get('role') === 'teacher') {
        if (!props.disable) {
            if (props.action !== '') {
                controls = (
                    <button className="btn btn-primary" onClick={() => {
                        return router.push({
                            pathname: '/course_details',
                            query: {courseId: course.id}
                        })
                    }}>{props.action}</button>)
            }
        }
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'admin') {
        controls = (
            <button className="btn btn-primary"
                    onClick={() => deleteCourse(props.course.id).then(res => {
                        if (res && res.data.success === true) {
                            props.setCourses(props.courses.filter(course => {
                                return course.id !== props.course.id
                            }));
                        } else {
                            window.alert("failed to delete course")
                        }
                    }).catch(err => console.log("Error ", err))}>
                Delete Course
            </button>)
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'student') {
        controls = (
            <button className="btn btn-success"
                    onClick={() => enrollStudentToCourse(course.id).then(res => {
                        if (res.data.success && res.data.success === true) {
                            setEnrolled(true);
                        } else {
                            window.alert("failed to enroll")
                        }
                    })}
                    disabled={enrolled}>{'enroll this course'}</button>)
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