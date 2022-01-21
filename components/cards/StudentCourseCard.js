import React from "react";
import {router} from "next/client";
import Cookies from "js-cookie";

const getCourseDetails = async (courseId) => {
    return router.push({
        pathname: '/course_details',
        query: {courseId: courseId}
    })
};

function StudentCourseCard(props) {
    {
        let controls;
        let commonControls = (<button type="button" className="btn btn-danger border-4"
                                      onClick={() =>
                                          props.optOut(
                                              props.studentId,
                                              props.course.id,
                                              props.courses,
                                              props.setCourses)}>Opt Out</button>)

        if (Cookies.get('access_token') && Cookies.get('role') === 'student') {
            controls = (
                <div>
                    <button className="btn btn-primary border-4" onClick={() => getCourseDetails(props.course.id)}>
                        View Contents
                    </button>
                    {commonControls}
                </div>
            )
        } else if (Cookies.get('access_token') && Cookies.get('role') === 'admin') {
            controls = {commonControls}
        }

        return (
            <div className="border rounded text-uppercase text-center">

                <h1 className="text-xl mb-1">{props.course.courseName}</h1>
                <h5 className="text-xl mb-1">{props.course.description}</h5>
                <h6 className="text-sm mb-1">difficulty level : {props.course.level}</h6>
                <div>
                    {controls}
                </div>

            </div>

        )
    }

}

export default StudentCourseCard;