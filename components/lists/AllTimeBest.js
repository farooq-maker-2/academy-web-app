import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CourseCard from "../cards/CourseCard";

const getAllTimeBestCourses = async () => {
    console.log('inside All Time Best Courses Component')
    return axios.get('http://localhost:8081/api/courses/all_time_top_ten', {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

function AllTimeBest() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getAllTimeBestCourses().then(res => {
            if (res && res.status === 200) {
                console.log("success")
                setCourses(res.data)
            } else {
                console.log("failure")
            }
        }).catch(err => console.log("Error ", err));

    }, []);

    let coursesList;
    if (courses.length == 0) {
        coursesList = <label>loading...</label>
    } else {
        coursesList = courses?.map((course) => (<CourseCard key={course.id} course={course}/>));
    }

    return (
        <div className="text-center">
            <h1>All Time Best Courses</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
        </div>);
}

export default AllTimeBest;