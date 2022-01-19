import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TeacherCourseContentCard from "./TeacherCourseContentCard";

class TeacherCourseDetails extends React.Component {

    state = {
        contents: [],
        courseId: this.props.courseId
    }

    componentDidMount() {
        this.getCourseContents().then(res => {
            const contents = res.data
            const {courseId} = this.state
            this.setState({
                contents,
                courseId
            });
        }).catch(err => console.log("Error ", err));
    }

    getCourseContents = async () => {

        console.log('Inside getCourseContents function')
        console.log(this.state.course)

        return await axios.get(`http://localhost:8081/api/courses/${this.state.courseId}/contents`, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
    };

    fileSelectedHandler = event => {
        const updatedState = {
            file: event.target.files[0]
        }
        this.setState(updatedState)
        console.log(this.state);
    }

    handleSubmit = async (event) => {

        event.preventDefault();

        console.log('Inside upload content function')
        try {
            if (this.state.file) {
                console.log('file exists')
            }

            const data = new FormData()
            const userId = Cookies.get("userId");
            data.append('file', this.state.file);

            return await axios.post(`http://localhost:8081/api/teachers/${userId}/courses/${this.state.courseId}/contents`,
                data, {
                    headers: {
                        AUTHORIZATION: 'Bearer ' + Cookies.get('access_token'),
                        'content-type': 'multipart/form-data'
                    }
                }).then(res => {
                console.log(res.status)
            }).catch(err => console.log("Error ", err))

        } catch (err) {
            console.log(err);
        }
        this.props.router.push('/teacher_home');

    }


    render() {

        const contentList = this.state.contents?.map((content) => (
            <TeacherCourseContentCard key={content.id} content={content} courseId={this.state.courseId}/>
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

                    <form onSubmit={this.handleSubmit}>
                        <input type="file"
                               name="file"
                               className="border rounded position-relative"
                               placeholder="file"
                               required
                               onChange={this.fileSelectedHandler}/><br/>
                        <br/>
                        <button className="btn btn-lg btn-primary" type="submit">Upload</button>
                    </form>

                </div>
            </div>
        )
    }

}

export default TeacherCourseDetails;
