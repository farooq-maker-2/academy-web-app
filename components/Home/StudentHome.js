import React, {useState} from "react";
import CourseCard from "../cards/CourseCard";
import Pagination from "../pagination/Pagination";

const StudentHome = (props) => {
    console.log('props')
    console.log(props)
    const [courses, setCourses] = useState(props.courses);
    const [pageIndex, setPageIndex] = useState(0);

    // useEffect(() => {
    //     getAllCourses(pageIndex).then(res => {
    //         if (res && res.status === 200) {
    //             console.log("success")
    //             setCourses(res.data.content)
    //             if (res.data.content.length === 0 && pageIndex > 0) {
    //                 setPageIndex(pageIndex - 1);
    //             }
    //         } else {
    //             console.log("failure")
    //         }
    //     }).catch(err => console.log("Error ", err));
    //
    // }, [pageIndex]);

    console.log('props.courses')
    console.log(props.courses)

    let coursesList = <strong>no courses available!!!</strong>
    if (props.courses) {
        coursesList = props.courses?.map((course) => (
            <CourseCard key={course.id} course={course}/>
        ));
    } else if (courses && courses.length > 0) {
        coursesList = courses?.map((course) => (
            <CourseCard key={course.id} course={course}/>
        ))
    }

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