import {downloadContent} from "../../lib/lib";

const StudentCourseContentActions = ({courseId, content}) => {

    return (
        <div className="actions">
            <a onClick={() => downloadContent(courseId, content)}>Download</a><br/>
            <style jsx global>{`
        .actions * {
          padding: 8px 0;
        }
        .actions a {
          margin-right: 1rem;
        }

        .a:hover {
          color: purple;
        }
      `}</style>
        </div>
    );
};

export default StudentCourseContentActions;
