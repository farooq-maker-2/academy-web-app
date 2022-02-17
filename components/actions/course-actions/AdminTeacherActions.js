import {Popconfirm} from "antd";
import {routeTOAllCoursesOfTeacher, deactivateUser} from "../../../lib/lib";
import {useRouter} from "next/router";

const AdminTeacherActions = ({teacher}) => {

    const router = useRouter();
    return (

        <div className="policy-package-actions">
            <a href="#" onClick={() => routeTOAllCoursesOfTeacher(teacher.id, router)}> View Courses</a>
            <Popconfirm
                title={"Deactivate teacher?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => deactivateUser(teacher.id, 'teacher')}
            >
                <a href="#">Deactivate</a>
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

export default AdminTeacherActions;
