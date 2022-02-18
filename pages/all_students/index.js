import React, {useEffect, useState} from "react";
import {getAllStudents} from "../../lib/lib";
import {Table} from "antd";
import "antd/dist/antd.css";
import Cookies from "js-cookie";
import AdminStudentActions from "../../components/actions/AdminStudentActions";

export default function AllStudents() {

    const [students, setStudents] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const {Column} = Table;

    useEffect(() => {
        getAllStudents(pageIndex).then(res => {
            if (res.data.success && res.data.success === true) {
                if (res.data.data.content.length !== 0 && pageIndex > -1) {
                    setStudents(res.data.data.content)
                    setPageIndex(pageIndex + 1);
                }
            } else {
                window.alert("failed to fetch students")
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    return (
        <div>
            <div className="text-center m-auto table-container">
                <h1 className="text-center title">All Students</h1>
                <Table dataSource={students}
                       rowKey="id"
                       pagination={{
                           pageSizeOptions: ["5", "10", "20"],
                           showSizeChanger: true,
                           locale: { items_per_page: "" }
                       }}>

                    <Column align="center" title="Name" dataIndex="lastName" key="lastName"/>
                    <Column align="center" title="Status" dataIndex="status" key="status"/>
                    <Column
                        align="center"
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_, student) => {
                            if (Cookies.get("role") === 'admin') {
                                return <AdminStudentActions student={student}/>;
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