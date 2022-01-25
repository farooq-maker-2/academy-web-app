import React, {useEffect, useState} from "react";
import {withRouter} from "next/router";
import {deactivateUser} from "../../lib/lib";

const getAllCoursesOfStudent = async (studentId, router) => {
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
            <button className="btn btn-primary" onClick={() => getAllCoursesOfStudent(student.id, props.router)}> View
                Courses
            </button>
            <button className="btn btn-primary" onClick={() => deactivateUser(student.id,'student')}> Deactivate
            </button>
        </div>
    )
}

export default withRouter(StudentListItem);