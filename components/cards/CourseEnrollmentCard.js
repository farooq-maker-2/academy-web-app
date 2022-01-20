import React, {Fragment, useState} from "react";
import {enrollStudentToCourse} from "../../lib/auth";

const enroll = async (courseId, setEnrolled) => {
    const status = await enrollStudentToCourse(courseId);
    if (status === 200) {
        setEnrolled(true);
    }
}


function CourseEnrollmentCard(props) {
    const [enrolled, setEnrolled] = useState(false)

    return (
        <div className="border rounded text-uppercase position-relative text-center">
            <h1 className="text-xl mb-0 ">{props.course.courseName}</h1>
            <h5 className="text-xl mb-0">{props.course.description}</h5>
            <h6 className="text-sm mb-0">difficulty level : {props.course.level}</h6>
            <button type="button" className="btn btn-success"
                    onClick={() => enroll(props.course.id, setEnrolled)}
                    disabled={enrolled}>
                Enroll This Course
            </button>
        </div>
    )
}

export default CourseEnrollmentCard;