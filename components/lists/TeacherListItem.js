import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {deactivateUser} from "../../lib/lib";
import {withRouter} from "next/router";

const getAllCoursesOfTeacher = async (teacherId, router) => {
    return router.push({
        pathname: '/all_courses_of_searched_teacher',
        query: {teacherId: teacherId}
    })
};

function TeacherListItem(props) {

    const [teacher, setTeacher] = useState({});

    useEffect(() => {
        setTeacher(props.teacher)
    }, [teacher]);

    let controls;
    let common = (<button className="btn btn-primary" onClick={() => getAllCoursesOfTeacher(teacher.id, props.router)}>
        View Courses
    </button>);
    if (Cookies.get("role") && Cookies.get("role") === 'admin') {
        controls = (
            <div>
                {common}
                <button className="btn btn-primary" onClick={() => deactivateUser(teacher.id, "teacher")}> Deactivate
                </button>
            </div>);
    } else if (Cookies.get("role") && Cookies.get("role") === 'student') {
        controls = (
            <div>
                {common}
            </div>);
    } else if (Cookies.get("role") && Cookies.get("role") === 'teacher') {
        controls = (
            <div>
                {common}
            </div>);
    }

    return (
        <div className="border rounded position-relative text-center">
            <h1 className="mb-1 position-relative ">{teacher.lastName}</h1>
            {controls}
        </div>
    )
}

export default withRouter(TeacherListItem);