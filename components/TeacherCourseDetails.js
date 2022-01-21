import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {withRouter} from "next/router";
import TeacherCourseContentListItem from "./lists/TeacherCourseContentListItem";
import {router} from "next/client";

const getCourseContents = async (courseId) => {
    if (courseId && courseId !== null) {
        return await axios.get(`http://localhost:8081/api/courses/${courseId}/contents`, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
    } else {
        console.log("failed to fetch course content");
    }
};

const handleSubmit = async (file, courseId, userId) => {
    event.preventDefault();
    console.log('Inside upload content function')
    try {
        const data = new FormData()
        const userId = Cookies.get("userId");
        data.append('file', file);

        if (file !== null) {
            console.log("file exists!!!")
        }
        return await axios.post(`http://localhost:8081/api/teachers/${userId}/courses/${courseId}/contents`,
            data, {
                headers: {
                    AUTHORIZATION: 'Bearer ' + Cookies.get('access_token'),
                    'content-type': 'multipart/form-data'
                }
            }).then(res => {
            if (res && res.status === 200) {
                console.log(res.status)
                router.push({
                    pathname: '/all_courses_of_teacher',
                    query: {teacherId: userId}
                });
            } else {
                console.log("failed to upload file!!!")
            }
        }).catch(err => console.log("Error ", err))

    } catch (err) {
        console.log(err);
    }
    await router.push('/teacher_home');

}

const fileSelectedHandler = (event, setFile) => {
    setFile(event.target.files[0])
}

function TeacherCourseDetails(props) {

    const [contents, setContents] = useState([]);
    const [courseId, setCourseId] = useState(-1);
    const [file, setFile] = useState(null);
    //const file = useRef(null)

    useEffect(() => {
        getCourseContents(props.courseId).then(res => {
            if (res && res.status === 200) {
                console.log("success")
                setCourseId(props.courseId)
                setContents(res.data)
            } else {
                console.log("failure")
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
            <h1 className="text-xl mb-1">Course Contents</h1>
            <div>
                <div>
                    <ul className="list-group list-group-flush">
                        {contentList}
                    </ul>
                </div>
                <form onSubmit={() => handleSubmit(file, courseId)}>

                    {/*If you pass a ref object to React with <div ref={myRef} />,
                     React will set its .current property to the corresponding DOM
                     node whenever that node changes. Keep in mind that useRef doesn’t
                     notify you when its content changes.
                     Mutating the .current property doesn’t cause a re-render.
                    */}
                    <input type="file"
                           name="file"
                           className="border rounded position-relative"
                           placeholder="file"
                           required
                        /*ref={file}*/
                        /*onChange={() => setFile(event.target.file)}*/
                           onChange={(event) => fileSelectedHandler(event, setFile)}/><br/>
                    <br/>
                    <button className="btn btn-lg btn-primary" type="submit">Upload</button>
                </form>

            </div>
        </div>
    )
}

export default withRouter(TeacherCourseDetails);
