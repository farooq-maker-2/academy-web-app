import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import StudentListItem from "./StudentListItem";
import Pagination from "../pagination/Pagination";

const getAllStudents = async (pageIndex) => {

    console.log('inside getAllStudents')
    return axios.get('http://localhost:8081/api/students', {
        params: {
            page: pageIndex
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

function AllStudents() {

    const [students, setStudents] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllStudents(pageIndex).then(res => {
            setStudents(res.data.content)
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    const studentsList = students?.map((student) => (
        <StudentListItem key={student.id} student={student}/>
    ));

    return (
        <div>
            <h1>All Students</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {studentsList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>);
}

export default AllStudents;