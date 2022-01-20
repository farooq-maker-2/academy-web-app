import React from "react";
import AllCoursesOfStudent from "../../components/lists/AllCoursesOfStudent";
import {withRouter} from "next/router";

function AllCoursesOFStudent(props) {

    console.log("id inside student get courses page")
    console.log(props.router.query.studentId)

    return <AllCoursesOfStudent studentId={props.router.query.studentId}/>

}

export default withRouter(AllCoursesOFStudent)