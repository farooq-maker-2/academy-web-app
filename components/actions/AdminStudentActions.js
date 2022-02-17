import {Popconfirm} from "antd";
import {useRouter} from "next/router";
import {deactivateUser, routeToAllCoursesOfStudent} from "../../lib/lib";


const AdminStudentActions = ({student}) => {

    const router = useRouter();
    return (
        <div className="policy-package-actions">

            <a href="#" onClick={() => routeToAllCoursesOfStudent(student.id, router)}>View Courses</a>
            <Popconfirm
                title={"Deactivate Student?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => deactivateUser(student.id, 'student')}
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
          color:  purple;
        }
      `}</style>
        </div>
    );
};

export default AdminStudentActions;
