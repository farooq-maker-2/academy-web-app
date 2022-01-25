import React, {useState} from "react";
import CourseCard from "../cards/CourseCard";
import Pagination from "../pagination/Pagination";

const TeacherHome = () => {
    return (
        <div className="text-center">
            <h1>Teacher Home</h1>
            <div data-purpose="billboard"
                 className="billboard-banner--billboard--3GBV3 billboard-banner--is-desktop--1A0jQ">
                <div className="billboard-banner--content-box--2LhRB">
                    <h1 data-purpose="billboard-title"
                        className="udlite-heading-serif-xxl billboard-banner--short-title--3HjCw">
                        Learning that gets you
                    </h1>
                    <p data-purpose="billboard-subtitle"
                       className="udlite-text-md billboard-banner--short-subtitle--BY95O">
                        Skills for your present (and your future). Get started with us.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TeacherHome;