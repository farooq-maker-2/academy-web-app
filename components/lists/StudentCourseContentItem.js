import React, {Fragment} from "react";
import {router} from "next/client";
import axios from "axios";
import Cookies from "js-cookie";

class StudentCourseContentItem extends React.Component {

    state = {
        content: this.props.content
    }


    downloadContent = async () => {

        console.log('Inside Download Content function')
        try {
            //const userId = Cookies.get('userId');
            const courseId = this.props.courseId;
            console.log('courseId')
            console.log(courseId)
            const contentId = this.state.content.id;
            console.log('content')
            console.log(this.props.content)
            const contentName = this.state.content.fileName;

            console.log('contentId', contentId)
            console.log('this.state.content.fileName', this.state.content.fileName);


            await axios.get(`http://localhost:8081/api/courses/${courseId}/contents/${contentName}`, {
                //get page number programmatically
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

    render() {
        return (

            <div className="border rounded position-relative mb-3">

                <div className="mb-1 position-relative text-lg-start">{this.props.content.fileName}</div>
                <button className="position-absolute btn btn-sm btn-primary end-0 bottom-0"
                        onClick={this.downloadContent}>Download File
                </button>
            </div>
        )
    }

}

export default StudentCourseContentItem;