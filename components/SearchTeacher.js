import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TeacherListItem from "./lists/TeacherListItem";


const handleChange = (event, setTeacherName) => {
    setTeacherName(event.target.value);
}

const handleSearch = async (teacherName, setTeachers) => {
    await axios.get(`http://localhost:8081/api/teachers/${teacherName}`, {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    }).then(res => {
        if (res && res.status === 200) {
            setTeachers(res.data)
        }
    }).catch(err => console.log("Error ", err));
};

function SearchTeacher(props) {

    const [teachers, setTeachers] = useState([]);
    const [teachersList, setTeachersList] = useState([]);
    const [teacherName, setTeacherName] = useState(0);

    useEffect(() => {
        setTeachersList(<strong>No Teachers Found !!!</strong>);
        if (teachers.length > 0) {
            setTeachersList(teachers?.map((teacher) => (
                <TeacherListItem key={teacher.id} teacher={teacher}/>
            )));
        }
    }, [teachers]);

    return (
        <div className="text-center">
            <h1>AVAILABLE COURSES</h1>
            <div className="form-signin position-relative mb-0">
                <input type="text"
                       placeholder="Search Courses of Teacher" size={20} name="search"
                       onChange={(event) => handleChange(event, setTeacherName)}/>
                <button className="w-auto btn btn-sm btn-secondary"
                        type="submit"
                        onClick={() => handleSearch(teacherName, setTeachers)}>
                    Search
                </button>
            </div>
            <div>
                <ul className="list-group list-group-flush">
                    {teachersList}
                </ul>
            </div>
        </div>
    );
}

export default SearchTeacher;