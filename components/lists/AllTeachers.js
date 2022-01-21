import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TeacherListItem from "./TeacherListItem";
import Pagination from "../pagination/Pagination";

const getAllTeachers = async (pageIndex) => {
    return axios.get('http://localhost:8081/api/teachers', {
        params: {
            page: pageIndex
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

function AllTeachers() {

    const [teachers, setTeachers] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllTeachers(pageIndex).then(res => {
            setTeachers(res.data.content)
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    const teachersList = teachers?.map((teacher) => (
        <TeacherListItem key={teacher.id} teacher={teacher}/>
    ));

    return (
        <div>
            <h1>All Teachers</h1>
            <div>
                <ul className="list-group list-group-flush">
                    {teachersList}
                </ul>
            </div>
            <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>);
}

export default AllTeachers;