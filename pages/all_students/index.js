import React, {useEffect, useState} from "react";
import {getAllStudents} from "../../lib/lib";
import StudentListItem from "../../components/lists/StudentListItem";
import Pagination from "../../components/pagination/Pagination";

export default function AllStudents() {

    const [students, setStudents] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllStudents(pageIndex).then(res => {
            setStudents(res.data.content)
            if (res.data.content.length === 0 && pageIndex > 0) {
                setPageIndex(pageIndex - 1);
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    const studentsList = students?.map((student) => (
        <StudentListItem key={student.id} student={student}/>
    ));

    return (
        <div>
            <h1 className="text-center title">All Students</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {studentsList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>);
}