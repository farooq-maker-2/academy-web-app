import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CourseCard from "../cards/CourseCard";
import Pagination from "../pagination/Pagination";

const getAllCoursesOfTeacher = async (teacherId, pageIndex) => {
    console.log('inside All Courses Of Teacher Component')
    //when teacher is logged in
    let userId = teacherId;
    //when admin ris logged in
    if (!userId) {
        userId = Cookies.get('userId')
    }
    console.log("userId", userId)
    console.log("pageIndex", pageIndex)

    return axios.get(`http://localhost:8081/api/teachers/${userId}/courses`, {
        params: {
            page: pageIndex
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

function AllCoursesOfTeacher(props) {

    const [courses, setCourses] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllCoursesOfTeacher(props.teacherId, pageIndex).then(res => {
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
        coursesList = courses?.map((course) => (
            <CourseCard key={course.id} course={course} teacherId={props.teacherId}/>
        ));
    } else {
        coursesList = <label className="mb-3">No courses found !!!</label>
    }

    return (
        <div>
            <h1>Your Courses</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>);
}

export default AllCoursesOfTeacher;