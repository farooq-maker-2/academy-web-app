import {downloadContent} from "../../lib/lib";

const StudentCourseContentActions = ({courseId, content}) => {

    return (
        <div className="policy-package-actions">
            <a onClick={() => downloadContent(courseId, content)}>Download</a><br/>
            <style jsx global>{`
        .policy-package-actions * {
          padding: 8px 0;
        }
        
        .policy-package-actions a {
          margin-right: 1rem;
        }

        .policy-package-actions a:hover {
          color: purple;
        }
      `}</style>
        </div>
    );
};

export default StudentCourseContentActions;
