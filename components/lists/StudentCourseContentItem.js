import React, {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {publicRuntimeConfig} from "../../next.config";

const downloadContent = async (courseId, content) => {
    console.log('Inside Download Content function')
    try {
        const contentName = content.fileName;
        let res = await axios.get(publicRuntimeConfig.serverBaseUrl + `/api/courses/${courseId}/contents/${contentName}`, {
            responseType: 'blob',
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        })
        if (res.status && res.status === 200) {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([res.data.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', contentName)
            // Append to html link element page
            document.body.appendChild(link);
            // Start download
            link.click();
            // Clean up and remove the link
            link.parentNode.removeChild(link);
        } else {
            window.alert("failed to download")
        }
    } catch (err) {
        console.log(err);
    }
};

function StudentCourseContentItem(props) {

    const [content, setContent] = useState(props.content);
    const [courseId, setCourseId] = useState(props.courseId);
    return (
        <div className="border rounded position-relative mb-3">
            <div className="mb-2 position-relative text-lg-start">
                <label>{'file name: '}
                    <strong>{content.fileName}</strong>
                </label>
            </div>
            <div className="mb-2 position-relative text-lg-start">
                <label>
                    {'file size: '}
                    <strong>{content.description + ' bytes'}</strong>
                </label>
            </div>
            <button className="{/*position-absolute*/} btn btn-sm btn-primary {/*end-0 bottom-0*/}"
                    onClick={() => downloadContent(courseId, content)}>Download File
            </button>
        </div>
    )
}

export default StudentCourseContentItem;