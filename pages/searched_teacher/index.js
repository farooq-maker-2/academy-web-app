import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {deactivateUser} from "../../lib/lib";
import {useRouter, withRouter} from "next/router";
import axios from "axios";
import {publicRuntimeConfig} from "../../next.config";
import Pagination from "../../components/pagination/Pagination";
import TeacherListItem from "../../components/lists/TeacherListItem";


const handleSearch = async (teacherName, setTeachers) => {
    await axios.get(publicRuntimeConfig.serverBaseUrl + `/api/teachers/${teacherName}`, {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    }).then(res => {
        if (res && res.status === 200) {
            setTeachers(res.data)
        }
    }).catch(err => console.log("Error ", err));
};

export default function SearchedTeacher(props) {

    const [teachers, setTeachers] = useState([]);
    const [teachersList, setTeachersList] = useState([]);
    const router = useRouter();
    // const [pageIndex, setPageIndex] = useState(0);
    // const [disablePagination, setDisablePagination] = useState(true);

    useEffect(() => {
        setTeachersList(<strong>No Teachers Found !!!</strong>);
        console.log('router.query.teacherName')
        console.log(router.query.teacherName)
        handleSearch(router.query.teacherName, setTeachers)
        if (teachers.length > 0) {
            setTeachersList(teachers?.map((teacher) => (
                <TeacherListItem key={teacher.id} teacher={teacher}/>
            )));
        }
    });

    return (
        <div className="text-center">
            <div disable="disabled">
                <ul className="list-group list-group-flush">
                    {teachersList}
                    {/*<Pagination*/}
                    {/*    pageIndex={pageIndex}*/}
                    {/*    setPageIndex={setPageIndex}/>*/}
                </ul>
            </div>
        </div>
    );
}