import React, {useEffect, useState} from 'react'
import "antd/dist/antd.css";
import {message, Table} from 'antd';
import {deleteCourse, enrollStudentToCourse, getAllCourses, reFetchCourses} from "../../lib/lib";
import Cookies from "js-cookie";
import StudentCourseEnrollActions from "../../components/actions/StudentCourseEnrollActions";
import AdminCourseActions from "../../components/actions/AdminCourseActions";

export default function AvailableCourses(props) {

    const {Column} = Table;
    const [courses, setCourses] = useState(props.courses);
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
        getAllCourses(pageIndex).then(res => {
            if (res.data.success && res.data.success === true) {
                setCourses(res.data.data.content)
            } else {
                window.alert("failed to fetch courses")
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    return (
        <div className="text-center m-auto table-container">
            <h1 className="title">All Courses</h1>
            <div className="">
                <Table
                    dataSource={courses}
                    rowKey="id"
                    pagination={{
                        pageSizeOptions: ["5", "10"],
                        showSizeChanger: false
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
                            if (Cookies.get("role") === 'student') {
                                return <StudentCourseEnrollActions course={course} onEnroll={enrollStudentToCourse}/>;
                            } else if (Cookies.get("role") === 'admin') {
                                return <AdminCourseActions course={course} onDelete={handleOnDeleteCourse}/>;
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
