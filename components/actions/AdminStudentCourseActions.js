import {Popconfirm} from "antd";
import {optOutHandler} from "../../lib/lib";

const AdminStudentCourseActions = ({studentId, course, courses, setCourses}) => {

    return (
        <div className="policy-package-actions">
            <Popconfirm
                title={"Delete this personalization rule?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => optOutHandler(studentId, course.id, courses, setCourses)}
            >
                <a href="#">optout</a>
            </Popconfirm>

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

export default AdminStudentCourseActions;
