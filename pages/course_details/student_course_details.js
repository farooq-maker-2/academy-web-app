import React, {useEffect, useState} from "react";
import {getCourseContents} from "../../lib/lib";
import {Table} from "antd";
import "antd/dist/antd.css";
import StudentCourseContentActions from "../../components/actions/StudentCourseContentActions";

function StudentCourseDetails(props) {
    const {Column} = Table;
    const [contents, setContents] = useState([]);
    const [courseId, setCourseId] = useState(props.courseId);

    useEffect(() => {

        getCourseContents(props.courseId).then(res => {
            if (res.data.success && res.data.success === true) {
                console.log('contents fetched');
                console.log(res.data.data);
                setContents(res.data.data);
            } else {
                window.alert("failed to get course contents")
            }
        }).catch(err => console.log("Error ", err));

    }, []);

    return (
        <div>
            <div className="text-center m-auto table-container">
                <h1 className="title mb-4">Course Contents</h1>
                <Table dataSource={contents} rowKey="id">

                    <Column align="center" title="File Name" dataIndex="fileName" key="fileName"/>
                    <Column align="center" title="Size" dataIndex="description" key="description"/>
                    <Column
                        align="center"
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_, content) => {
                            return <StudentCourseContentActions courseId={courseId} content={content}/>;
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

    )
}

export default StudentCourseDetails;