import React from "react";
import AllTime from "../../pages/all_time_best";
import TrendingCourses from "../../pages/top_trending";
import AvailableCourses from "../../pages/available_courses";
import SearchTeacher from "../../components/SearchTeacher";

const AllCourses = (props) => {

    return (
        <div>
            <div className="w-100 center position-absolute">
                <SearchTeacher/>
                <div className="d-inline-block p-10 panel-width-30">
                    <AvailableCourses courses={props.courses}/>
                </div>
                <div className="d-inline-block p-10 panel-width-30">
                    <AllTime/>
                </div>
                <div className="d-inline-block p-10 panel-width-30">
                    <TrendingCourses/>
                </div>
            </div>
            <style jsx global>{`
                .center {
                    margin: auto;
                    width: 50%;
                    border: 3px solid green;
                    padding: 10px;
                }`}</style>
        </div>
    );
}

export default AllCourses;