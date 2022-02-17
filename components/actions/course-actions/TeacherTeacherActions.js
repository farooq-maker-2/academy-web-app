import {routeTOAllCoursesOfTeacher} from "../../../lib/lib";
import {useRouter} from "next/router";

const TeacherTeacherActions = ({teacher}) => {

    const router = useRouter();
    return (
        <div className="policy-package-actions">

            <a href="#" onClick={() => routeTOAllCoursesOfTeacher(teacher.id, router)}>View Courses</a>

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

export default TeacherTeacherActions;
