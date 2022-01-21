import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CourseCard from "../cards/CourseCard";
import Pagination from "../pagination/Pagination";

const getAllCourses = async (pageIndex) => {
    return axios.get('http://localhost:8081/api/courses', {
        params: {
            page: pageIndex
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

function StudentHome() {

    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllCourses(pageIndex).then(res => {
            if (res && res.status === 200) {
                console.log("success")
                setCourses(res.data.content)
            } else {
                console.log("failure")
            }
        }).catch(err => console.log("Error ", err));

    }, [pageIndex]);


    // updateAndFetch = async (courses, updatedIndex) => {
    //     this.setState({
    //         courses,
    //         pageIndex: updatedIndex
    //     })
    //     return this.getAllCourses().then(res => {
    //         this.setState({
    //             courses: res.data.content
    //         })
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    let coursesList = courses?.map((course) => (
        <CourseCard key={course.id} course={course}/>
    ));

    return (
        <div className="text-center">
            <h1>Student Home</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
            <br/>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>
    );
}

export default StudentHome;