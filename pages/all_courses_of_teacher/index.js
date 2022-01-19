import React from "react";
import AllCoursesOfTeacher from "../../components/lists/AllCoursesOfTeacher";
import {withRouter} from "next/router";

function AllCoursesOFTeacher(props) {

    console.log("id inside page")
    console.log(props.router.query.teacherId)

    return <AllCoursesOfTeacher teacherId={props.router.query.teacherId}/>

}

export default withRouter(AllCoursesOFTeacher)