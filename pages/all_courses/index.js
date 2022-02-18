import React from "react";
import AllTime from "../../pages/all_time_best";
import TrendingCourses from "../../pages/top_trending";
import AvailableCourses from "../../pages/available_courses";
import SearchTeacher from "../../components/SearchTeacher";

const AllCourses = (props) => {

    return (
        <div>
            <div>
                <SearchTeacher/>
                <div className="p-10">
                    <AvailableCourses courses={props.courses}/>
                </div>
                <div className="p-10">
                    <AllTime/>
                </div>
                <div className="p-10">
                    <TrendingCourses/>
                </div>
            </div>
        </div>
    );
}

export default AllCourses;