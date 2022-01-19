import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CourseEnrollmentCard from "../cards/CourseEnrollmentCard";
import TeacherListItem from "../TeacherListItem";

class SearchTeacher extends React.Component {

    state = {
        teacherName: '',
        teachers: []
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state);
    }


    handleSearch = async () => {
        try {
            console.log('this.state.teacherName')
            console.log(this.state.teacherName)
            const res = await axios.get(`http://localhost:8081/api/teachers/${this.state.teacherName}`, {
                headers: {
                    AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
                }
            });
            const {teacherName} = this.state;
            this.setState({
                teachers: res.data.content,
                teacherName
            });
        } catch (err) {
            console.log(err);
        }
    };

    updateAndFetch = async (courses, updatedIndex) => {
        const updatedState = {
            courses: courses,
            pageIndex: updatedIndex
        }

        await this.setState(updatedState)
        return this.getAllCourses().then(res => {
            this.setState({
                courses: res.data.content
            })
        }).catch(err => {
            console.log(err);
        });
        ;
    }

    render() {

        const teachers = this.state.teachers?.map((teacher) => (
            <TeacherListItem key={teacher.id} teacher={teacher}/>
        ));


        return (
            <div>
                <h1>AVAILABLE COURSES</h1>
                <div className="form-signin position-relative mb-0">
                    <input type="text"
                           placeholder="Search Courses of Teacher" size={20} name="search"
                           onChange={this.handleChange}/>
                    <button className="w-auto btn btn-sm btn-secondary"
                            type="submit"
                            onClick={this.handleSearch}>
                        Search
                    </button>
                </div>
                <div>
                    <ul className="list-group list-group-flush">
                        {teachers}
                    </ul>
                </div>
            </div>
        );
    }

}

export default SearchTeacher;