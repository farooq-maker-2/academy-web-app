import React, {useEffect, useState} from "react";
import {withRouter} from "next/router";
import CourseCard from "../../components/cards/CourseCard";
import Pagination from "../../components/pagination/Pagination";
import {getAllCoursesOfTeacher} from "../../lib/lib";

function AllCoursesOFTeacher(props) {

    const teacherId = props.router.query.teacherId;
    const [courses, setCourses] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllCoursesOfTeacher(teacherId, pageIndex).then(res => {
            if (res && res.status === 200) {
                console.log("success")
                setCourses(res.data)
                console.log(res.data)
                if (res.data.length === 0 && pageIndex > 0) {
                    console.log(courses)
                    setPageIndex(pageIndex - 1);
                }
            } else {
                console.log("failure")
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    let coursesList;
    if (courses && courses.length > 0) {
        coursesList = courses?.map((course) => (
            <CourseCard key={course.id} courses={courses} course={course} teacherId={props.teacherId} setCourses={setCourses}/>
        ));
    } else {
        coursesList = <label className="mb-3">No courses found !!!</label>
    }

    return (
        <div className="text-uppercase text-center">
            <h1>All Courses Of Teacher</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>);

}

export default withRouter(AllCoursesOFTeacher)