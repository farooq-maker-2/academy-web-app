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
            if (res.data.success && res.data.success === true) {
                setCourses(res.data.data)
                if (res.data.data.length === 0 && pageIndex > 0) {
                    setPageIndex(pageIndex - 1);
                }
            } else {
                window.alert("failed to fetch list of enrolled courses")
            }
        }).catch(err => console.log("Error ", err));

    }, [pageIndex]);

    let coursesList;
    if (courses && courses.length > 0) {
        console.log('props.studentId');
        console.log(props.studentId);
        coursesList = courses?.map((course) => (<div key={course.id}>
            <StudentCourseCard
                courses={courses}
                course={course}
                studentId={studentId}
                setCourses={setCourses}
            />
        </div>));
    } else {
        coursesList = <label className="mb-3">No courses found !!!</label>
    }

    return (
        <div className="text-center">
            <h1 className="title">All Courses Of Student</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
            {/*<footer className="bg-dark text-center text-lg-start top-100">*/}
            {/*    <div className="text-center p-3">*/}
            {/*        <button className="btn btn-primary"*/}
            {/*                onClick={() => {*/}
            {/*                    if (pageIndex > 0) {*/}
            {/*                        setPageIndex(pageIndex - 1)*/}
            {/*                    }*/}
            {/*                }}>Previous*/}
            {/*        </button>*/}
            {/*        <button className="btn btn-primary"*/}
            {/*                onClick={() => {*/}
            {/*                    setPageIndex(pageIndex + 1)*/}
            {/*                }}>Next Page*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</footer>*/}
        </div>);
}


export default AllCoursesOfStudent;