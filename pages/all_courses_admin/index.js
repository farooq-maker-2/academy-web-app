import React, {useEffect, useState} from "react";
import {withRouter} from "next/router";
import CourseCard from "../../components/cards/CourseCard";
import Pagination from "../../components/pagination/Pagination";
import {getAllCourses, getAllCoursesOfTeacher} from "../../lib/lib";

function AllCoursesAdmin() {

    const [courses, setCourses] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllCourses(pageIndex).then(res => {
            if (res && res.status === 200) {
                if (res.data.length === 0 && pageIndex > 0) {
                    setPageIndex(pageIndex - 1);
                } else {
                    setCourses(res.data.content)
                }
            } else {
                console.log("failure")
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    let coursesList;
    if (courses && courses.length > 0) {
        coursesList = courses?.map((course) => (
            <CourseCard
                key={course.id}
                courses={courses}
                course={course}
                setCourses={setCourses}
                action={'Delete Course'}
            />
        ));
    } else {
        coursesList = <label className="mb-3">No courses found !!!</label>
    }

    return (
        <div className="text-uppercase text-center">
            <h1 className="title">All Courses</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>);

}

export default withRouter(AllCoursesAdmin)