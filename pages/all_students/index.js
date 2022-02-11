import React, {useEffect, useState} from "react";
import {getAllStudents} from "../../lib/lib";
import StudentListItem from "../../components/lists/StudentListItem";
import Pagination from "../../components/pagination/Pagination";

export default function AllStudents() {

    const [students, setStudents] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllStudents(pageIndex).then(res => {
            if (res.data.success && res.data.success === true) {
                if (res.data.data.content.length !== 0 && pageIndex > -1) {
                    setStudents(res.data.data.content)
                    setPageIndex(pageIndex + 1);
                }
            } else {
                window.alert("failed to fetch students")
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