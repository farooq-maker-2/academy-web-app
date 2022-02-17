import {useRouter} from "next/router";
import Cookies from "js-cookie";
import StudentCourseDetails from "./student_course_details";
import TeacherCourseDetails from "./teacher_course_details";

function Details() {

    const router = useRouter();
    let courseId = router.query.courseId;

    if (Cookies.get('role') === 'teacher') {
        return <TeacherCourseDetails courseId={courseId} router={router}/>;
    } else if (Cookies.get('role') === 'student') {
        return <StudentCourseDetails courseId={courseId} router={router}/>;
    } else {
        return <h1>404 - Page Not Found</h1>
    }
}

export default Details;