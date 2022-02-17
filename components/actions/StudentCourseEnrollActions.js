import {Popconfirm} from "antd";
import {enrollStudentToCourse} from "../../lib/lib";

const StudentCourseEnrollActions = ({course}) => {

    return (
        <div className="policy-package-actions">
            <Popconfirm
                title={"Enroll this course?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => enrollStudentToCourse(course.id).then(res => {
                    if (res.data.success && res.data.success === true) {
                        window.alert("enrolled successfully")
                    } else {
                        window.alert("failed to enroll")
                    }
                })}
            >
                <a href="#">Enroll</a>
            </Popconfirm>

            <style jsx global>{`
        .policy-package-actions {
          display: flex;
          justify-content: space-around;
        }
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

export default StudentCourseEnrollActions;
