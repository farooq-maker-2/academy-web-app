import React, {useEffect, useState} from "react";
import {getAllTeachers} from "../../lib/lib";
import TeacherListItem from "../../components/lists/TeacherListItem";
import Pagination from "../../components/pagination/Pagination";

export default function AllTeachers() {

    const [teachers, setTeachers] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllTeachers(pageIndex).then(res => {
            setTeachers(res.data.content)
            if (res.data.content.length === 0 && pageIndex > 0) {
                setPageIndex(pageIndex - 1);
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    const teachersList = teachers?.map((teacher) => (
        <TeacherListItem key={teacher.id} teacher={teacher}/>
    ));

    return (
        <div className="text-center">
            <h1>All Teachers</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {teachersList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>);
}