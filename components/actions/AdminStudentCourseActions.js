import {Popconfirm} from "antd";
import {optOutHandler} from "../../lib/lib";

const AdminStudentCourseActions = ({studentId, course, courses, setCourses}) => {

    return (
        <div className="actions">
            <Popconfirm
                title={"opt out student from this course?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => optOutHandler(studentId, course.id, courses, setCourses)}
            >
                <a>OptOut</a>
            </Popconfirm>
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

export default AdminStudentCourseActions;
