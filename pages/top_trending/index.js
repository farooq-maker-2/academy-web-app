import React, {useEffect, useState} from 'react'
import "antd/dist/antd.css";
import {message, Table} from 'antd';
import {deleteCourse, enrollStudentToCourse, getTrendingCourses, reFetchCourses} from "../../lib/lib";
import AdminCourseActions from "../../components/actions/AdminCourseActions";
import StudentCourseEnrollActions from "../../components/actions/StudentCourseEnrollActions";
import Cookies from "js-cookie";

export default function TopTrending() {

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
        getTrendingCourses().then(res => {
            if (res.data.success && res.data.success === true) {
                console.log(res.data.data)
                setCourses(res.data.data)
            } else {
                window.alert("failed to fetch courses")
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);


    return (
        <div className="block text-center">
            <h1 className="title">Top Trending</h1>
            <div className="m-auto table-container">
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
                    border: 3px solid green;
                    padding: 10px;
                }`}</style>
        </div>

    );
}
