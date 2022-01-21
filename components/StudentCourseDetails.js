import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import StudentCourseContentItem from "./lists/StudentCourseContentItem";

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


function StudentCourseDetails(props) {

    const [contents, setContents] = useState([]);
    const [courseId, setCourseId] = useState(0);


    useEffect(() => {
        getCourseContents(props.courseId).then(res => {
            if (res && res.status === 200) {
                console.log("success")
                setContents(res.data)
            } else {
                console.log("failure")
            }
        }).catch(err => console.log("Error ", err));

    }, [courseId]);


    let contentList;
    if (contents && contents.length > 0) {
        contentList = contents?.map((content) => (<div key={content.id}>
            <StudentCourseContentItem key={content.id} content={content} courseId={props.courseId}/>
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
            </div>
        </div>
    )
}

export default StudentCourseDetails;