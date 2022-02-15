import Cookies from "js-cookie";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import TeacherCourseContentListItem from "../../components/lists/TeacherCourseContentListItem";
import {fileSelectedHandler, getCourseContents} from "../../lib/lib";
import {publicRuntimeConfig} from "../../next.config";

const handleSubmit = async (file, courseId, userId, router) => {
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

    const [contents, setContents] = useState([]);
    const [courseId, setCourseId] = useState(-1);
    const [file, setFile] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getCourseContents(props.courseId).then(res => {
            if (res.data.success && res.data.success === true) {
                setCourseId(props.courseId)
                setContents(res.data.data)
            } else {
                window.alert("failed to get course contents")
            }
        }).catch(err => console.log("Error ", err));

    }, [courseId]);


    let contentList;
    if (contents && contents.length > 0) {
        contentList = contents?.map((content) => (<div key={content.id}>
            <TeacherCourseContentListItem key={content.id} content={content} courseId={props.courseId}/>
        </div>));
    } else {
        contentList = <label className="mb-3">No contents found !!!</label>
    }

    return (
        <div href="#" className="border rounded text-uppercase text-center">
            <h1 className="text-xl mb-1 title">Course Contents</h1>
            <div>
                <div>
                    <ul className="list-group list-group-flush">
                        {contentList}
                    </ul>
                </div>
                <form onSubmit={() => handleSubmit(file, courseId).then(res => {
                    if (res.data.success && res.data.success === true) {
                        window.alert("uploaded successfully");
                        router.push({
                            pathname: '/all_courses_of_teacher',
                            query: {teacherId: Cookies.get("userId")}
                        });
                    }else{
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
                    <button className="btn btn-lg btn-primary" type="submit">Upload</button>
                </form>

            </div>
        </div>
    )
}

export default TeacherCourseDetails;