import React, {Fragment} from "react";

class TeacherCourseContentCard extends React.Component {

    state = {
        file: '',
        courseId: this.props.courseId
    }

    render() {
        return (
            <Fragment>
                <div className="border rounded position-relative">
                    <a1 href="#" className="mb-1 position-relative text-lg-start">{this.props.content.fileName}</a1>
                </div>
                <br/>
            </Fragment>
        )
    }

}

export default TeacherCourseContentCard;