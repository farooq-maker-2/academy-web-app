import Cookies from "js-cookie";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {fileSelectedHandler, getCourseContents} from "../../lib/lib";
import {publicRuntimeConfig} from "../../next.config";
import {Table} from "antd";
import "antd/dist/antd.css";

const handleSubmit = async (file, courseId) => {
    event.preventDefault();
    console.log('Inside upload content function')
    try {
        const data = new FormData()
        const userId = Cookies.get("userId");
        data.append('file', file);
        return axios.post(publicRuntimeConfig.serverBaseUrl + `/api/teachers/${userId}/courses/${courseId}/contents`,
            data, {
                headers: {
                    AUTHORIZATION: 'Bearer ' + Cookies.get('access_token'),
                    'content-type': 'multipart/form-data'
                }
            });
    } catch (err) {
        console.log(err);
    }
}

function TeacherCourseDetails(props) {

    const {Column} = Table;
    const [contents, setContents] = useState([]);
    const [courseId, setCourseId] = useState(props.courseId);
    const [file, setFile] = useState(null);
    const router = useRouter();

    useEffect(() => {
        console.log('props.courseId')
        console.log(props.courseId)
        setCourseId(props.courseId)
        getCourseContents(courseId).then(res => {
            if (res.data.success && res.data.success === true) {
                setContents(res.data.data)
            } else {
                window.alert("failed to get course contents")
            }
        }).catch(err => console.log("Error ", err));

    }, []);

    return (
        <div>
            <div className="text-center m-auto table-container">
                <h1 className="title mb-4">Course Contents</h1>
                <form onSubmit={() => handleSubmit(file, courseId).then(res => {
                    if (res.data.success && res.data.success === true) {
                        window.alert("uploaded successfully");
                        router.push({
                            pathname: '/all_courses_of_teacher',
                            query: {teacherId: Cookies.get("userId")}
                        });
                    } else {
                        window.alert("upload failed");
                    }
                })}>
                    <input type="file"
                           name="file"
                           className="border rounded position-relative"
                           placeholder="file"
                           required
                           onChange={(event) => fileSelectedHandler(event, setFile)}/><br/>
                    <br/>
                    <button className="btn btn-lg btn-success" type="submit">Upload</button>
                </form>
                <Table dataSource={contents}
                       rowKey="id"
                       pagination={{
                           pageSizeOptions: ["5", "10", "20"],
                           showSizeChanger: true,
                           locale: { items_per_page: "" }
                       }}>

                    <Column align="center" title="File Name" dataIndex="fileName" key="fileName"/>
                    <Column align="center" title="Size" dataIndex="description" key="description"/>
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

export default TeacherCourseDetails;