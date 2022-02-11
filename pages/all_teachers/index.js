import React, {useEffect, useState} from "react";
import {getAllTeachers} from "../../lib/lib";
import TeacherListItem from "../../components/lists/TeacherListItem";
import Pagination from "../../components/pagination/Pagination";

export default function AllTeachers() {

    const [teachers, setTeachers] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllTeachers(pageIndex).then(res => {
            if (res.data.data.content.length !== 0 && pageIndex > -1) {
                setTeachers(res.data.data.content)
                setPageIndex(pageIndex + 1);
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    const teachersList = teachers?.map((teacher) => (
        <TeacherListItem key={teacher.id} teacher={teacher}/>
    ));

    return (
        <div className="text-center">
            <h1 className="text-center title">All Teachers</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {teachersList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>);
}