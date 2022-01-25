import React, {useEffect, useState} from "react";
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


export default AllCoursesOfStudent;