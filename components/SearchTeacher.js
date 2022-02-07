import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TeacherListItem from "./lists/TeacherListItem";
import {publicRuntimeConfig} from "../next.config";
import Pagination from "./pagination/Pagination";
import {useRouter} from "next/router";

const handleChange = (event, setTeacherName) => {
    setTeacherName(event.target.value);
}

const handleSearch = async (teacherName, router/*, setTeachers*/) => {
    await axios.get(publicRuntimeConfig.serverBaseUrl + `/api/teachers/${teacherName}`, {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    }).then(res => {
        if (res && res.status === 200) {
            // setTeachers(res.data)
            router.push({
                pathname: '/searched_teacher',
                query: {teacherName: teacherName}
            })
        }
    }).catch(err => console.log("Error ", err));
};

function SearchTeacher() {

    // const [teachers, setTeachers] = useState([]);
    // const [teachersList, setTeachersList] = useState([]);
    const [teacherName, setTeacherName] = useState('');
    const router = useRouter();
    // const [pageIndex, setPageIndex] = useState(0);
    // const [disablePagination, setDisablePagination] = useState(true);

    // useEffect(() => {
    //     //setTeachersList(<strong>No Teachers Found !!!</strong>);
    //     if (teachers.length > 0) {
    //         // setDisablePagination(false)
    //         setTeachersList(teachers?.map((teacher) => (
    //             <TeacherListItem key={teacher.id} teacher={teacher}/>
    //         )));
    //     }
    // }, [teachers]);

    return (
        <div className="text-center">
            <div className="title">
                {/*<h1 className="title">Search Teacher</h1>*/}
                <input type="text" size={30} name="search" placeholder="search teacher"
                       onChange={(event) => handleChange(event, setTeacherName)}/>
                <button className="w-auto btn-sm btn-secondary mb-lg-4"
                        type="submit"
                        onClick={() => handleSearch(teacherName, router/*, setTeachers*/)}>
                    Search
                </button>
            </div>
            {/*<div disable="disabled">*/}
            {/*    <ul className="list-group list-group-flush">*/}
            {/*        {teachersList}*/}
            {/*        <Pagination></Pagination>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    );
}

export default SearchTeacher;