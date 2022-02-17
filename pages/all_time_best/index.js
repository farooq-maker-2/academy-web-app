import React, {useEffect, useState} from 'react'
import "antd/dist/antd.css";
import {message, Table} from 'antd';
import {deleteCourse, enrollStudentToCourse, getAllCourses, getAllTimeBestCourses, reFetchCourses} from "../../lib/lib";
import AdminCourseActions from "../../components/actions/AdminCourseActions";
import StudentCourseEnrollActions from "../../components/actions/StudentCourseEnrollActions";
import Cookies from "js-cookie";

export default function AllTimeBest() {

    const {Column} = Table;
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
        getAllTimeBestCourses().then(res => {
            if (res.data.success && res.data.success === true) {
                setCourses(res.data.data)
            } else {
                window.alert("failed to fetch courses")
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);


    return (
        <div>
            <div className="d-inline-block w-auto text-center center">
                <h1 className="title">All Time Best Courses</h1>
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
                                return <AdminCourseActions course={course} onDelete={handleOnDeleteCourse}/>;
                            } else if (Cookies.get("role") === 'student') {
                                return <StudentCourseEnrollActions course={course} onEnroll={enrollStudentToCourse}/>;
                            }/*else if(Cookies.get("role") === 'teacher'){
                            return <TeacherCourseActions course={course} onDelete={handleOnDeleteCourse}/>;
                        }*/
                        }}
                    />
                </Table>
            </div>
            <style jsx global>{`
                .center {
                    margin: auto;
                    width: 50%;
                    border: 3px solid green;
                    padding: 10px;
                }`}</style>
        </div>
    );
}
