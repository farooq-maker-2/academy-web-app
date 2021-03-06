import {Popconfirm} from "antd";
import {useRouter} from "next/router";
import {optOutHandler} from "../../lib/lib";

const StudentEnrolledCourseViewActions = ({studentId, course, courses, setCourses}) => {

    const router = useRouter();
    const viewCourse = () => {
        return router.push({
            pathname: '/course_details',
            query: {courseId: course.id}
        });
    };

    return (
        <div className="actions">
            <a onClick={viewCourse}>View</a><br/>
            <Popconfirm
                title={"Opt out from this course?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => optOutHandler(studentId, course.id, courses, setCourses)}
            >
                <a>Opt Out</a>
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

export default StudentEnrolledCourseViewActions;
