import {routeToTeacherCourseDetails} from "../../lib/lib";
import {useRouter} from "next/router";

const TeacherCourseActions = ({course}) => {

    const router = useRouter();
    return (
        <div className="actions">
            <a onClick={() => routeToTeacherCourseDetails(course, router)}>View</a>
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

export default TeacherCourseActions;
