import React, {Fragment, useEffect, useState} from "react";

function TeacherCourseContentListItem(props) {

    const [content, setContent] = useState({});
    const [courseId, setCourseId] = useState(-1);
    useEffect(() => {
        setContent(props.content)
        setCourseId(props.courseId)
    }, []);

    return (
        <Fragment>
            <div className="border rounded position-relative">
                <span className="mb-1 position-relative">{content.fileName}</span>
            </div>
            <br/>
        </Fragment>
    )
}

export default TeacherCourseContentListItem;