import {Popconfirm} from "antd";
import {routeTOAllCoursesOfTeacher, deactivateUser} from "../../lib/lib";
import {useRouter} from "next/router";

const AdminTeacherActions = ({teacher}) => {

    const router = useRouter();
    return (

        <div className="actions">
            <a onClick={() => routeTOAllCoursesOfTeacher(teacher.id, router)}> View Courses</a>
            <Popconfirm
                title={"Deactivate teacher?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => deactivateUser(teacher.id, 'teacher')}
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

export default AdminTeacherActions;
