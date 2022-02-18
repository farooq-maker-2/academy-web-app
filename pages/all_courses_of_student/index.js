import React, {useEffect, useState} from "react";
import {getEnrolledCoursesOfStudent} from "../../lib/lib";
import {useRouter} from "next/router";
import {Table} from "antd";
import Cookies from "js-cookie";
import StudentEnrolledCourseViewActions from "../../components/actions/StudentEnrolledCourseViewActions";
import AdminStudentCourseActions from "../../components/actions/AdminStudentCourseActions";

function AllCoursesOfStudent(props) {
    const router = useRouter();
    const studentId = router.query.studentId
    const [courses, setCourses] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const {Column} = Table;

    useEffect(() => {
        getEnrolledCoursesOfStudent(studentId, pageIndex).then(res => {
            if (res.data.success && res.data.success === true) {
                setCourses(res.data.data)
                if (res.data.data.length === 0 && pageIndex > 0) {
                    setPageIndex(pageIndex - 1);
                }
            } else {
                window.alert("failed to fetch list of enrolled courses")
            }
        }).catch(err => console.log("Error ", err));

    }, [pageIndex]);

    useEffect(() => {
    }, [courses]);

    return (
        <div>
            <div className="text-center m-auto table-container">
                <h1 className="title text-uppercase">All Courses Of Student</h1>
                <Table dataSource={courses} rowKey="id">

                    <Column align="center" title="Course Name" dataIndex="courseName" key="courseName"/>
                    <Column align="center" title="Description" dataIndex="description" key="description"/>
                    <Column align="center" title="Level" dataIndex="level" key="level"/>
                    <Column
                        align="center"
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_, course) => {
                            if (Cookies.get("role") === 'admin') {
                                return <AdminStudentCourseActions
                                    studentId={studentId}
                                    course={course}
                                    courses={courses}
                                    setCourses={setCourses}/>;
                            } else if (Cookies.get("role") === 'student') {
                                return <StudentEnrolledCourseViewActions
                                    studentId={studentId}
                                    course={course}
                                    courses={courses}
                                    setCourses={setCourses}/>;
                            }
                        }}
                    />
                </Table>
            </div>
            <style jsx global>{`
                .center {
                    margin: auto;
                    border: 3px solid green;
                    padding: 10px;
                }`}</style>
        </div>
    );
}


export default AllCoursesOfStudent;