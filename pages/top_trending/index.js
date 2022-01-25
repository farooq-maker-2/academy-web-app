import React, {useEffect, useState} from "react";
import {getTrendingCourses} from "../../lib/lib";
import CourseCard from "../../components/cards/CourseCard";

export default function TrendingCourses() {

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