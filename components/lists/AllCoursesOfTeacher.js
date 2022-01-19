import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TeacherCourseCard from "../cards/TeacherCourseCard";

class AllCoursesOfTeacher extends React.Component {

    state = {
        courses: [],
        pageIndex: 0
    }

    componentDidMount() {
        this.getAllCoursesOfTeacher().then(/*res => console.log(res.status)*/);
    }

    getAllCoursesOfTeacher = async () => {

        console.log('inside All Courses Of Teacher Component')
        let userId = this.props.teacherId;
        if (!userId) {
            userId = Cookies.get('userId')
        }
        console.log("userId", userId)
        console.log("pageIndex", this.state.pageIndex)

        return await axios.get(`http://localhost:8081/api/teachers/${userId}/courses`, {
            params: {
                page: this.state.pageIndex
            },
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        }).then(res => {
            const {pageIndex} = this.state;
            this.setState({
                courses: res.data,
                pageIndex: pageIndex
            });
        }).catch(err => console.log("Error ", err));
    };

    updateAndFetch = async (courses, updatedIndex) => {
        await this.setState({
            courses: courses,
            pageIndex: updatedIndex
        })
        return this.getAllCoursesOfTeacher();
    }

    render() {

        const courses = this.state.courses?.map((course) => (
            <div key={course.id}>
                <TeacherCourseCard course={course} teacherId={this.props.teacherId}/>
            </div>
        ));

        return (
            <div>
                <h1>Your Courses</h1>
                <div>
                    <ul className="list-group list-group-flush">
                        {courses}
                    </ul>
                </div>
                <button className="btn btn-primary"
                        onClick={() => this.updateAndFetch(this.state.courses, this.state.pageIndex - 1)}>Previous
                </button>
                <button className="btn btn-primary"
                        onClick={() => this.updateAndFetch(this.state.courses, this.state.pageIndex + 1)}>Next Page
                </button>

            </div>);
    }

}

export default AllCoursesOfTeacher;