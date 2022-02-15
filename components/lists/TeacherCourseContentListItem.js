import React, {Fragment, useEffect, useState} from "react";

function TeacherCourseContentListItem(props) {

    const [content, setContent] = useState({});
    const [courseId, setCourseId] = useState(-1);
    useEffect(() => {
        setContent(props.content)
        setCourseId(props.courseId)
    }, []);

    return (
        <div className="text-center">
            <div className="border rounded position-relative">
                <span className="mb-1 position-relative">{content.fileName}</span>
            </div>
            <br/>
        </div>
    )
}

export default TeacherCourseContentListItem;