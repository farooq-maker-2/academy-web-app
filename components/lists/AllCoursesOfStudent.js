import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import StudentCourseCard from "../cards/StudentCourseCard";

const getEnrolledCoursesOfStudent = async (studentId, pageIndex) => {
    console.log('inside Enrolled Courses Of Student Component')
    //when student is logged in
    let userId = studentId;
    //when admin is logged in
    if (!userId) {
        userId = Cookies.get('userId')
    }
    return axios.get(`http://localhost:8081/api/students/${userId}/courses`,
        {
            params: {
                page: pageIndex
            },
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
}

const optOutHandler = async (studentId, courseId, courses, setCourses) => {

    console.log('Inside opt out function')
    console.log(courseId)
    try {
        let userId = studentId;
        if (!userId) {
            userId = Cookies.get('userId')
        }
        console.log('userId ' + userId)
        console.log('courseId ' + courseId)
        const res = await axios.put(`http://localhost:8081/api/students/${userId}/courses/${courseId}`, {}, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });

        if (res.status && res.status === 200) {
            setCourses(courses.filter(course => {
                return course.id !== courseId
            }));

        } else {
            console.log("failed to opt out!!!")
        }

    } catch (err) {
        console.log(err);
    }
};

function AllCoursesOfStudent(props) {

    const [courses, setCourses] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getEnrolledCoursesOfStudent(props.studentId, pageIndex).then(res => {
            if (res && res.status === 200) {
                console.log("success")
                setCourses(res.data)
            } else {
                console.log("failure")
            }
        }).catch(err => console.log("Error ", err));

    }, [pageIndex]);

    let coursesList;
    if (courses && courses.length > 0) {
        coursesList = courses?.map((course) => (<div key={course.id}>
            <StudentCourseCard
                courses={courses}
                course={course}
                studentId={props.studentId}
                optOut={optOutHandler}
                setCourses={setCourses}
            />
        </div>));
    } else {
        coursesList = <label className="mb-3">No courses found !!!</label>
    }

    return (
        <div className="text-center">
            <h1>Your Courses</h1>

            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
            <div className="position-absolute bottom-0 mb-4">
                <button className="btn btn-primary"
                        onClick={() => {
                            if (pageIndex > 0) {
                                setPageIndex(pageIndex - 1)
                            }
                        }}>Previous
                </button>
                <button className="btn btn-primary"
                        onClick={() => setPageIndex(pageIndex + 1)}>Next Page
                </button>
            </div>
        </div>);

}

export default AllCoursesOfStudent;