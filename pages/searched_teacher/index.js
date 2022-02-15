import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import axios from "axios";
import {publicRuntimeConfig} from "../../next.config";
import TeacherListItem from "../../components/lists/TeacherListItem";


const handleSearch = async (teacherName, setTeachers) => {
    await axios.get(publicRuntimeConfig.serverBaseUrl + `/api/teachers/${teacherName}`, {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    }).then(res => {
        if (res.data.success && res.data.success === true) {
            setTeachers(res.data.data)
        }
    }).catch(err => console.log("Error ", err));
};

export default function SearchedTeacher(props) {

    const [teachers, setTeachers] = useState([]);
    //const [teachersList, setTeachersList] = useState([]);
    const router = useRouter();
    // const [pageIndex, setPageIndex] = useState(0);
    // const [disablePagination, setDisablePagination] = useState(true);

    useEffect(() => {
        console.log('router.query.teacherName')
        console.log(router.query.teacherName)
        handleSearch(router.query.teacherName, setTeachers)
    }, []);

    let teachersList;
    if (teachers.length > 0) {
        teachersList = (teachers?.map((teacher) => (
            <TeacherListItem key={teacher.id} teacher={teacher}/>
        )));
    } else {
        teachersList = <strong>No Teachers Found !!!</strong>;
    }

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