import React, {useEffect, useState} from "react";
import CourseCard from "../../components/cards/CourseCard";
import {getAllTimeBestCourses} from "../../lib/lib";

export default function AllTime() {
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
        coursesList = courses?.map((course) => (<CourseCard key={course.id}
                                                            course={course}
                                                            action={'enroll this course'}
                                                            disable={true}/>));
    }

    return (
        <div className="text-center">
            <h1 className="title">All Time Best Courses</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {coursesList}
                </ul>
            </div>
        </div>);
}