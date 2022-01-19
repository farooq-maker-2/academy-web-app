import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CourseEnrollmentCard from "../cards/CourseEnrollmentCard";

class AllTimeBest extends React.Component {

    state = {
        courses: []
    }

    componentDidMount() {
        this.getAllTimeBestCourses().then(res => {
            this.setState({
                courses: res.data
            });
        }).catch(err => console.log("Error ", err));
        ;
    }

    getAllTimeBestCourses = async () => {

        console.log('inside All Time Best Courses Component')
        return await axios.get('http://localhost:8081/api/courses/all_time_top_ten', {
            //get page number programmatically
            params: {
                page: 0
            },
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
    };

    render() {

        const courses = this.state.courses?.map((course) => (
            <CourseEnrollmentCard key={course.id} course={course}/>
        ));

        return (
            <div>
                <h1>All Time Best Courses</h1>

                <div>
                    <ul className="list-group list-group-flush">
                        {courses}
                    </ul>
                </div>

            </div>);
    }

}

export default AllTimeBest;