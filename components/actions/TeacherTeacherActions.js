import {routeTOAllCoursesOfTeacher} from "../../lib/lib";
import {useRouter} from "next/router";

const TeacherTeacherActions = ({teacher}) => {

    const router = useRouter();
    return (
        <div className="actions">
            <a onClick={() => routeTOAllCoursesOfTeacher(teacher.id, router)}>View Courses</a>
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

export default TeacherTeacherActions;
