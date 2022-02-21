import {Popconfirm} from "antd";
import {enrollStudentToCourse} from "../../lib/lib";

const StudentCourseEnrollActions = ({course}) => {

    return (
        <div className="actions">
            <Popconfirm
                title={"Enroll this course?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => enrollStudentToCourse(course.id).then(res => {
                    if (res.data.success && res.data.success === true) {
                        window.alert(res.data.message)
                    } else {
                        window.alert("failed to enroll")
                    }
                })}
            >
                <a>Enroll</a>
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

export default StudentCourseEnrollActions;
