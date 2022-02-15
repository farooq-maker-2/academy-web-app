import React, {useEffect, useState} from "react";
import {withRouter} from "next/router";
import CourseCard from "../../components/cards/CourseCard";
import Pagination from "../../components/pagination/Pagination";
import {getAllCoursesOfTeacher} from "../../lib/lib";
import Cookies from "js-cookie";
import SearchTeacher from "../../components/SearchTeacher";

function AllCoursesOFSearchedTeacher(props) {

    const teacherId = props.router.query.teacherId;
    const [courses, setCourses] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [action, setAction] = useState('');

    useEffect(() => {
        getAllCoursesOfTeacher(teacherId, pageIndex)
            .then(res => {
            if (res && res.data.success === true) {
                if (res.data.data.length > 0 /*&& pageIndex > -1*/) {
                    setCourses(res.data.data)
                    //setPageIndex(pageIndex + 1);
                }
            } else {
                window.alert("failed to fetch courses of teacher")
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    let coursesList;
    // if (Cookies.get('role') === 'student') {
    //     setAction('enroll this Course');
    // }
    if (courses && courses.length > 0) {
        coursesList = courses?.map((course) => (
            <CourseCard
                key={course.id}
                courses={courses}
                course={course}
                teacherId={props.teacherId}
                setCourses={setCourses}
                action={action}
            />
        ));
    } else {
        coursesList = <label className="mb-3">No courses found !!!</label>
    }

    return (
        <div className="text-uppercase text-center">
            {/*<SearchTeacher/>*/}
            <h1 className="title">All Courses Of Searched Teacher</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>);

}

export default withRouter(AllCoursesOFSearchedTeacher)