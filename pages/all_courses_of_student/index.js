import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {getEnrolledCoursesOfStudent} from "../../lib/lib";
import StudentCourseCard from "../../components/cards/StudentCourseCard";
import Pagination from "../../components/pagination/Pagination";
import {useRouter} from "next/router";

function AllCoursesOfStudent(props) {
    const router = useRouter();
    const studentId = router.query.studentId
    const [courses, setCourses] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getEnrolledCoursesOfStudent(studentId, pageIndex).then(res => {
            if (res && res.status === 200) {
                setCourses(res.data)
                if (res.data.length === 0 && pageIndex > 0) {
                    setPageIndex(pageIndex - 1);
                }
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
            <h1>All Courses Of Student</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>);
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


export default AllCoursesOfStudent;