import React, {useEffect, useState} from "react";
import {getAllCourses} from "../../lib/lib";
import CourseCard from "../../components/cards/CourseCard";
import Cookies from "js-cookie";

export default function AvailableCourses(props) {
    const [courses, setCourses] = useState(props.courses);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        event.preventDefault();
        getAllCourses(pageIndex).then(res => {
            if (res && res.status === 200) {
                setCourses(res.data.data.content)
                if (res.data.data.content.length === 0 && pageIndex > 0) {
                    setPageIndex(pageIndex - 1);
                }
            } else {
                window.alert("failed to fetch available courses")
            }
        }).catch(err => console.log("Error ", err));

    }, [pageIndex]);

    let coursesList = <strong>no courses available!!!</strong>
    let action = '';
    if (Cookies.get('role') === 'student') {
        action = 'Enroll this Course';
    } else {
        action = '';
    }
    if (props.courses) {
        coursesList = props.courses?.map((course) => (
            <CourseCard key={course.id} course={course} action={action}/>
        ));
    } else if (courses && courses.length > 0) {
        coursesList = courses?.map((course) => (
            <CourseCard key={course.id} course={course} action={action}/>
        ))
    }

    return (
        <div className="text-center">
            <h1>All Courses</h1>
            <ul className="list-group list-group-flush">
                {coursesList}
            </ul>
            {/*<Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>*/}
        </div>
    );
}