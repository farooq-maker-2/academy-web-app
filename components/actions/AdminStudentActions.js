import {Popconfirm} from "antd";
import {useRouter} from "next/router";
import {deactivateUser, routeToAllCoursesOfStudent} from "../../lib/lib";


const AdminStudentActions = ({student}) => {

    const router = useRouter();
    return (
        <div className="actions">

            <a onClick={() => routeToAllCoursesOfStudent(student.id, router)}>View Courses</a>
            <Popconfirm
                title={"Delete Student?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => deactivateUser(student.id, 'student')}
            >
                <a>Deactivate</a>
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

export default AdminStudentActions;
