import React, {Fragment} from "react";

class TeacherCourseContentListItem extends React.Component {

    state = {
        file: '',
        courseId: this.props.courseId
    }

    render() {
        return (
            <Fragment>
                <div className="border rounded position-relative">
                    {/*<a1 href="#" className="mb-1 position-relative text-lg-start">{this.props.content.fileName}</a1>*/}
                    <span className="mb-1 position-relative">{this.props.content.fileName}</span>
                </div>
                <br/>
            </Fragment>
        )
    }

}

export default TeacherCourseContentListItem;