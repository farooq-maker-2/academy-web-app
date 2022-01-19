import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

class StudentHome extends React.Component {

    state = {
        courses: []
    }

    componentDidMount() {
        this.getAllCourses().then(res => {
            const courses = res.data.content//.toArray();
            this.setState({
                courses
            });
        }).catch(err => console.log("Error ", err));
    }

    getAllCourses = async () => {
        return await axios.get('http://localhost:8081/api/courses', {
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

        return (
            <div>

                <div data-purpose="billboard"
                     className="billboard-banner--billboard--3GBV3 billboard-banner--is-desktop--1A0jQ">
                    <div className="billboard-banner--content-box--2LhRB">
                        <h1 data-purpose="billboard-title"
                            className="udlite-heading-serif-xxl billboard-banner--short-title--3HjCw">
                            Learning that gets you
                        </h1>
                        <p data-purpose="billboard-subtitle"
                           className="udlite-text-md billboard-banner--short-subtitle--BY95O">
                            Skills for your present (and your future). Get started with us.
                        </p>
                    </div>
                </div>

            </div>
        );
    }

}

export default StudentHome;