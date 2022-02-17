import {routeToTeacherCourseDetails} from "../../../lib/lib";
import {useRouter} from "next/router";

const TeacherCourseActions = ({course}) => {

    const router = useRouter();
    return (
        <div className="policy-package-actions">
            <a href="#" onClick={() => routeToTeacherCourseDetails(course, router)}>View</a>
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

export default TeacherCourseActions;
