import StudentCourseDetails from "../../components/StudentCourseDetails";
import TeacherCourseDetails from "../../components/TeacherCourseDetails";
import {useRouter, withRouter} from "next/router";
import Cookies from "js-cookie";

function Details(props) {

    const router = useRouter();
    console.log('props.router.query.courseId')
    console.log(props.router.query.courseId)

    if (Cookies.get('role') === 'teacher') {
        return <TeacherCourseDetails courseId={props.router.query.courseId} router={router}/>;
    } else if (Cookies.get('role') === 'student') {
        return <StudentCourseDetails courseId={props.router.query.courseId} router={router}/>;
    }
}

export default withRouter(Details)