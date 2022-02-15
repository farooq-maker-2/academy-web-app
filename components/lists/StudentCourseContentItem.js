import axios from "axios";
import Cookies from "js-cookie";
import {publicRuntimeConfig} from "../../next.config";

const downloadContent = async (courseId, content) => {
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
            const url = window.URL.createObjectURL(new Blob([res.data]));
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

    return (
        <div className="border rounded position-relative mb-3 text-center">
            <div className="mb-2 position-relative">
                <label>{'file name: '}
                    <strong>{props.content.fileName}</strong>
                </label>
            </div>
            <div className="mb-2 position-relative">
                <label>
                    {'file size: '}
                    <strong>{props.content.description + ' bytes'}</strong>
                </label>
            </div>
            <button className="btn btn-sm btn-primary"
                    onClick={() => downloadContent(props.courseId, props.content)}>Download File
            </button>
        </div>
    )
}

export default StudentCourseContentItem;