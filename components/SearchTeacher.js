import React, {useState} from "react";
import {useRouter} from "next/router";

const handleChange = (event, setTeacherName) => {
    setTeacherName(event.target.value);
}

const handleSearch = async (teacherName, router/*, setTeachers*/) => {
    router.push({
        pathname: '/searched_teacher_list',
        query: {teacherName: teacherName}
    })
};

function SearchTeacher() {

    const [teacherName, setTeacherName] = useState('');
    const router = useRouter();
    return (
        <div className="text-center">
            <div className="title">
                <input type="text" size={30} name="search" placeholder="search teacher"
                       onChange={(event) => handleChange(event, setTeacherName)}/>
                <button className="w-auto btn-sm btn-secondary mb-lg-4"
                        type="submit"
                        onClick={() => handleSearch(teacherName, router/*, setTeachers*/)}>
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchTeacher;