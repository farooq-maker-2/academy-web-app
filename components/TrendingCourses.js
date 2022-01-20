import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CourseEnrollmentCard from "./cards/CourseEnrollmentCard";

class TrendingCourses extends React.Component {

    state = {
        courses: []
    }

    componentDidMount() {
        this.getTrendingCourses().then(res => {
            const courses = res.data
            this.setState({
                courses
            });
        }).catch(err => console.log("Error ", err));
    }

    getTrendingCourses = async () => {

        console.log('inside TrendingCourses Component')
        return await axios.get('http://localhost:8081/api/courses/top_trending', {
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
                <h1>Top Trending</h1>

                <div>
                    <ul className="list-group list-group-flush">
                        {courses}
                    </ul>
                </div>

            </div>);
    }

}

export default TrendingCourses;