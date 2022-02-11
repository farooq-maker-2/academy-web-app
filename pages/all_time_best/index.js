import React, {useEffect, useState} from "react";
import CourseCard from "../../components/cards/CourseCard";
import {getAllTimeBestCourses} from "../../lib/lib";

export default function AllTime() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getAllTimeBestCourses().then(res => {
            if (res.data.success && res.data.success === true) {
                setCourses(res.data.data)
            } else {
                window.alert("failed")
            }
        }).catch(err => console.log("Error ", err));

    }, []);

    let coursesList;
    if (courses.length == 0) {
        coursesList = <strong>no courses available!!!</strong>
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