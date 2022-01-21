import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CourseCard from "../cards/CourseCard";


const getTrendingCourses = async () => {

    console.log('inside TrendingCourses Component')
    return await axios.get('http://localhost:8081/api/courses/top_trending', {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

function TrendingCourses() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getTrendingCourses().then(res => {
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
            <h1>Top Trending</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
        </div>);
}

export default TrendingCourses;