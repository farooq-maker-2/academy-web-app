import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CourseEnrollmentCard from "../cards/CourseEnrollmentCard";

class StudentHome extends React.Component {

    state = {
        courses: [],
        teachers: [],
        pageIndex: 0
    }

    componentDidMount() {
        this.getAllCourses().then(res => {
            this.setState({
                courses: res.data.content
            })
        }).catch(err => {
            console.log(err);
        });
    }

    getAllCourses = async () => {

        return await axios.get('http://localhost:8081/api/courses', {
            params: {
                page: this.state.pageIndex
            },
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
    };

    updateAndFetch = async (courses, updatedIndex) => {
        this.setState({
            courses,
            pageIndex: updatedIndex
        })
        return this.getAllCourses().then(res => {
            this.setState({
                courses: res.data.content
            })
        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        const courses = this.state.courses?.map((course) => (
            <CourseEnrollmentCard key={course.id} course={course}/>
        ));


        return (
            <div>
                <h1>Student Home</h1>
                {/*{*/}
                {/*    this.state.courses.map(c => <h6 key={c.id}>{c.title}</h6>)*/}
                {/*}*/}
                {/*{this.getAllCourses()}*/}
                {/*<div>*/}
                {/*    <input type="text" placeholder="Search.." name="search"/>*/}
                {/*    <button type="submit"*/}
                {/*            onClick={this.updateAndFetch(this.state.courses, this.state.pageIndex - 1)}>Submit*/}
                {/*    </button>*/}
                {/*</div>*/}
                <div>
                    <ul className="list-group list-group-flush">
                        {courses}
                    </ul>
                </div>
                <br/>
                {/*<div className="position-relative bottom-0 end-50">*/}
                <div className="position-absolute bottom-0 mb-4">
                    <button className="btn btn-primary"
                            onClick={() => this.updateAndFetch(this.state.courses, this.state.pageIndex - 1)}>Previous
                    </button>
                    <button className="btn btn-primary"
                            onClick={() => this.updateAndFetch(this.state.courses, this.state.pageIndex + 1)}>Next Page
                    </button>
                </div>
            </div>
        );
    }

}

export default StudentHome;