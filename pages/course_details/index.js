import StudentCourseDetails from "../../components/StudentCourseDetails";
import TeacherCourseDetails from "../../components/TeacherCourseDetails";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

function Details() {

    const router = useRouter();
    console.log('router.query.courseId')
    console.log(router.query.courseId)
    let courseId = null;
    if (router.query.courseId) {
        courseId = router.query.courseId;
    }

    if (Cookies.get('role') === 'teacher') {
        return <TeacherCourseDetails courseId={courseId} router={router}/>;
    } else if (Cookies.get('role') === 'student') {
        return <StudentCourseDetails courseId={courseId} router={router}/>;
    } else {
        return <h1>404 - Page Not Found</h1>
    }
}

export default Details;