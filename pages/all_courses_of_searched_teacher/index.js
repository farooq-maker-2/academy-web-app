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
    // let isOwner = false;
    // if(teacherId === Cookies.get("userId")){
    //     isOwner = true;
    // }
    let action = '';
    if(Cookies.get('role') === 'student'){
        action= 'Enroll this Course';
    }else{
        action= '';
    }
    if (courses && courses.length > 0) {
        coursesList = courses?.map((course) => (
            <CourseCard
                key={course.id}
                courses={courses}
                course={course}
                teacherId={props.teacherId}
                setCourses={setCourses}
                /*own = {isOwner}*/
                action={action}
            />
        ));
    } else {
        coursesList = <label className="mb-3">No courses found !!!</label>
    }

    return (
        <div className="text-uppercase text-center">
            <SearchTeacher/>
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