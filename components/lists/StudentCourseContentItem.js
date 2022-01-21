import React, {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const downloadContent = async (courseId, content) => {
    console.log('Inside Download Content function')
    try {
        const contentName = content.fileName;
        await axios.get(`http://localhost:8081/api/courses/${courseId}/contents/${contentName}`, {
            responseType: 'blob',
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        }).then((response) => {
            console.log(response.status)
            if (response.status === 200) {
                // Create blob link to download
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', contentName)
                // Append to html link element page
                document.body.appendChild(link);
                // Start download
                link.click();
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

function StudentCourseContentItem(props) {

    const [content, setContent] = useState(props.content);
    const [courseId, setCourseId] = useState(props.courseId);
    return (
        <div className="border rounded position-relative mb-3">
            <div className="mb-1 position-relative text-lg-start">{content.fileName}</div>
            <button className="position-absolute btn btn-sm btn-primary end-0 bottom-0"
                    onClick={() => downloadContent(courseId, content)}>Download File
            </button>
        </div>
    )
}

export default StudentCourseContentItem;