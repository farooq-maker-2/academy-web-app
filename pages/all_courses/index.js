import React from "react";
import AllTime from "../../pages/all_time_best";
import TrendingCourses from "../../pages/top_trending";
import AvailableCourses from "../../pages/available_courses";
import SearchTeacher from "../../components/SearchTeacher";

const AllCourses = (props) => {

    return (
        <div>
            <SearchTeacher/>
            <div className="d-inline-block">
                <AvailableCourses courses={props.courses}/>
            </div>
            <div className="table">
                <AllTime/>
                <TrendingCourses/>
            </div>
            <style jsx global>{`
                .table {
                    display: inline-block;
                    width: 400px;
                    height: auto; //200px;
                    padding: 5px;
                }`}</style>
        </div>
    );
}

export default AllCourses;