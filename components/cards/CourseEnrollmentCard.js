import React, {Fragment} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {enrollStudentToCourse} from "../../lib/auth";

class CourseEnrollmentCard extends React.Component {

    state = {
        enrolled: false
    }

    enrollStudentToCourse = async () => {

        const status = await enrollStudentToCourse(this.props.course.id);
        if (status === 200) {
            this.setState({
                enrolled: true
            });
        }
    }

    render() {
        return (
            <Fragment>
                <div className="border rounded text-uppercase position-relative text-center">
                    <h1 className="text-xl mb-0 ">{this.props.course.courseName}</h1>
                    <h5 className="text-xl mb-0">{this.props.course.description}</h5>
                    <h6 className="text-sm mb-0">difficulty level : {this.props.course.level}</h6>
                    <button type="button" className="btn btn-success"
                            onClick={this.enrollStudentToCourse}
                            disabled={this.state.enrolled}>
                        Enroll This Course
                    </button>
                </div>
            </Fragment>
        )
    }

}

export default CourseEnrollmentCard;