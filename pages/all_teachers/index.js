import React, {useEffect, useState} from "react";
import {enrollStudentToCourse, getAllTeachers} from "../../lib/lib";
import {Table} from "antd";
import "antd/dist/antd.css";
import Cookies from "js-cookie";
import StudentCourseActions from "../../components/actions/course-actions/StudentCourseEnrollActions";
import TeacherCourseActions from "../../components/actions/course-actions/TeacherCourseActions";
import AdminTeacherActions from "../../components/actions/course-actions/AdminTeacherActions";

export default function AllTeachers() {

    const {Column} = Table;
    const [teachers, setTeachers] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllTeachers(pageIndex).then(res => {
            if (res.data.data.content.length !== 0) {
                setTeachers(res.data.data.content)
            }else{
                window.alert('failed to fetch teachers')
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    return (
        <div>
            <div className="block w-50 p-10 text-center center">
                <h1 className="text-center title">All Teachers</h1>
                <Table dataSource={teachers} rowKey="id">
                    <Column align="center" title="Name" dataIndex="lastName" key="lastName"/>
                    <Column align="center" title="Status" dataIndex="status" key="status"/>
                    <Column
                        align="center"
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_, teacher) => {
                            if(Cookies.get("role") === 'admin'){
                                return <AdminTeacherActions teacher={teacher}/>;
                            }else if(Cookies.get("role") === 'student'){
                                return <StudentCourseActions teacher={teacher} onEnroll={enrollStudentToCourse}/>;
                            }else if(Cookies.get("role") === 'teacher'){
                                return <TeacherCourseActions teacher={teacher}/>;
                            }
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