import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import axios from "axios";
import {publicRuntimeConfig} from "../../next.config";
import TeacherListItem from "../../components/lists/TeacherListItem";
import {Table} from "antd";
import "antd/dist/antd.css";
import {enrollStudentToCourse} from "../../lib/lib";
import TeacherTeacherActions from "../../components/actions/course-actions/TeacherTeacherActions";
import StudentTeacherActions from "../../components/actions/course-actions/StudentTeacherActions";
import AdminTeacherActions from "../../components/actions/course-actions/AdminTeacherActions";


const handleSearch = async (teacherName, setTeachers) => {
    await axios.get(publicRuntimeConfig.serverBaseUrl + `/api/teachers/${teacherName}`, {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    }).then(res => {
        if (res.data.success && res.data.success === true) {
            setTeachers(res.data.data)
        }
    }).catch(err => console.log("Error ", err));
};

export default function SearchedTeacher() {

    const [teachers, setTeachers] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const router = useRouter();
    const {Column} = Table;

    useEffect(() => {
        console.log('router.query.teacherName')
        console.log(router.query.teacherName)
        handleSearch(router.query.teacherName, setTeachers)
    }, []);

    return (
        <div>
            <div className="w-50 p-3 text-center center">
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
                            if (Cookies.get("role") === 'admin') {
                                return <AdminTeacherActions teacher={teacher} pageIndex={pageIndex}/>;
                            } else if (Cookies.get("role") === 'student') {
                                return <StudentTeacherActions teacher={teacher} onEnroll={enrollStudentToCourse}/>;
                            } else if (Cookies.get("role") === 'teacher') {
                                return <TeacherTeacherActions teacher={teacher}/>;
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
        </div>)
}