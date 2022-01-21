import React, {useEffect, useState} from "react";
import {withRouter} from "next/router";
import {router} from "next/client";
import {deactivateUser} from "../../lib/auth";

const deactivate = async (studentId) => {
    return await deactivateUser(studentId, "student");
}

const getAllCoursesOfStudent = async (studentId) => {
    await router.push({
        pathname: '/all_courses_of_student',
        query: {studentId: studentId}
    })
};

function StudentListItem(props) {

    const [student, setStudent] = useState({});

    useEffect(() => {
        setStudent(props.student)
    }, []);

    return (
        <div className="border rounded position-relative text-center">

            <h1 className="mb-1 position-relative ">{student.firstName} {student.lastName}</h1>
            <button className="btn btn-primary" onClick={() => getAllCoursesOfStudent(student.id)}> View Courses
            </button>
            <button className="btn btn-primary" onClick={() => deactivate(student.id)}> Deactivate
            </button>
        </div>
    )
}

export default withRouter(StudentListItem);