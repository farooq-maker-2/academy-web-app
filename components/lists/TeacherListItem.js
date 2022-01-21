import React, {useEffect, useState} from "react";
import {withRouter} from "next/router";
import {router} from "next/client";
import Cookies from "js-cookie";
import {deactivateUser} from "../../lib/auth";

const getAllCoursesOfTeacher = async (teacherId) => {
    await router.push({
        pathname: '/all_courses_of_teacher',
        query: {teacherId: teacherId}
    })
};

const deactivate = async (teacherId) => {
    await deactivateUser(teacherId, "teacher");
}

function TeacherListItem(props) {

    const [teacher, setTeacher] = useState({});

    useEffect(() => {
        setTeacher(props.teacher)
    }, [teacher]);

    let controls;
    if (Cookies.get("role") && Cookies.get("role") === 'admin') {
        controls = (
            <div>
                <button className="btn btn-primary" onClick={() => getAllCoursesOfTeacher(teacher.id)}> View Courses
                </button>
                <button className="btn btn-primary" onClick={() => deactivate(teacher.id)}> Deactivate
                </button>
            </div>);
    } else if (Cookies.get("role") && Cookies.get("role") === 'student') {
        controls = (
            <div>
                <button className="btn btn-primary" onClick={() => getAllCoursesOfTeacher(teacher.id)}> View Courses
                </button>
            </div>);
    }
    return (
        <div className="border rounded position-relative text-center">
            <h1 className="mb-1 position-relative ">{teacher.firstName} {teacher.lastName}</h1>
            {controls}
        </div>
    )
}

export default withRouter(TeacherListItem);