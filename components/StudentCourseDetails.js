import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import StudentCourseContentCard from "./cards/StudentCourseContentCard";

class StudentCourseDetails extends React.Component {

    state = {
        contents: [],
        courseId: this.props.courseId
    }

    componentDidMount() {
        this.getCourseContents().then(res => {
            console.log(res)
        });
    }

    getCourseContents = async () => {

        console.log('Inside getCourseContents function')
        console.log(this.state.course)

        const courseId = this.state.courseId;
        console.log('courseId ' + courseId)

        return await axios.get(`http://localhost:8081/api/courses/${courseId}/contents`, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        }).then(res => {
            const contents = res.data
            this.setState({
                contents: contents,
                courseId: this.props.courseId
            });
        }).catch(err => console.log("Error ", err));

    };


    render() {

        const contentList = this.state.contents?.map((content) => (
            <StudentCourseContentCard key={content.id} content={content} courseId={this.state.courseId}/>
        ));

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

}

export default StudentCourseDetails;