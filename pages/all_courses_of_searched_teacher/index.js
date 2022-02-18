import React, {useEffect, useState} from "react";
import {withRouter} from "next/router";
import {deleteCourse, enrollStudentToCourse, getAllCoursesOfTeacher, reFetchCourses} from "../../lib/lib";
import Cookies from "js-cookie";
import {message, Table} from "antd";
import AdminCourseActions from "../../components/actions/AdminCourseActions";
import "antd/dist/antd.css";
import StudentCourseEnrollActions from "../../components/actions/StudentCourseEnrollActions";
import TeacherCourseActions from "../../components/actions/TeacherCourseActions";

function AllCoursesOFSearchedTeacher(props) {

    const {Column} = Table;
    const teacherId = props.router.query.teacherId;
    const [courses, setCourses] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    const handleOnDeleteCourse = async (courseId) => {
        deleteCourse(courseId)
            .then(() => {
                message.success(`Course ${courseId} has been deleted`);
                reFetchCourses(pageIndex, setCourses);
            })
            .catch(() => {
                message.error("There was an error encountered while deleting.");
            });
    };

    useEffect(() => {
        getAllCoursesOfTeacher(teacherId, pageIndex)
            .then(res => {
                if (res && res.data.success === true) {
                    if (res.data.data.length > 0) {
                        setCourses(res.data.data)
                    }
                } else {
                    window.alert("failed to fetch courses of teacher")
                }
            }).catch(err => console.log("Error ", err));
    }, [pageIndex]);


    return (
        <div>
            <div className="text-center center table-container">
                <h1 className="title mb-4">All Courses Of Teacher</h1>
                <Table dataSource={courses}
                       rowKey="id"
                       pagination={{
                           pageSizeOptions: ["5", "10", "20"],
                           showSizeChanger: true,
                           locale: { items_per_page: "" }
                       }}>

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
                                return <AdminCourseActions course={course} onDelete={handleOnDeleteCourse}/>;
                            } else if (Cookies.get("role") === 'student') {
                                return <StudentCourseEnrollActions course={course} onEnroll={enrollStudentToCourse}/>;
                            } else if (Cookies.get("role") === 'teacher') {
                                return <TeacherCourseActions course={course} onDelete={handleOnDeleteCourse}/>;
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
        </div>)
}

export default withRouter(AllCoursesOFSearchedTeacher)