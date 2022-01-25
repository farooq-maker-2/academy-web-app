import axios from 'axios';
import Cookies from "js-cookie";

export const RegisterUser = (data) => {
    event.preventDefault();
    console.log("loginUser:");
    return axios.post('http://localhost:8081/api/users/register', data);
}

export const loginUser = (email, password, router) => {

    event.preventDefault();
    console.log("loginUser:");
    const data = {
        email,
        password
    }
    return axios.post('http://localhost:8081/api/users/login', data,
        {
            params: {
                email,
                password
            }
        }
    ).then(res => {
        Cookies.set("access_token", res.headers["access_token"]);
        Cookies.set("refresh_token", res.headers["refresh_token"]);
        Cookies.set("userId", res.data.id);
        Cookies.set("role", res.data.role);
        router.push('/home')
    }).catch(err => console.log("Error ", err));
}

export const deactivateUser = async (id, role) => {

    event.preventDefault();
    console.log("deactivate user:");
    let userId = id;
    let userRole = role;
    if (userId === null) {
        userId = Cookies.get('userId');
    }
    if (userRole === null) {
        userRole = Cookies.get('role');
    }
    return axios.delete(`http://localhost:8081/api/users/${userId}/deactivate/${userRole}`, {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
}

export const enrollStudentToCourse = async (courseId) => {

    console.log('Inside enroll function')
    try {
        const userId = Cookies.get('userId');
        console.log('userId ' + userId)
        console.log('courseId ' + courseId)


        return axios.post(`http://localhost:8081/api/students/${userId}/courses/${courseId}`, null, {
            //get page number programmatically
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const getAllCourses = async (pageIndex) => {
    return axios.get('http://localhost:8081/api/courses', {
        params: {
            page: pageIndex
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
}

export const getAllCoursesOfTeacher = async (teacherId, pageIndex) => {
    console.log('inside All Courses Of Teacher Component')
    //when teacher is logged in
    let userId = teacherId;
    //when admin ris logged in
    if (!userId) {
        userId = Cookies.get('userId')
    }
    console.log("userId", userId)
    console.log("pageIndex", pageIndex)

    return axios.get(`http://localhost:8081/api/teachers/${userId}/courses`, {
        params: {
            page: pageIndex
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

export const getEnrolledCoursesOfStudent = async (studentId, pageIndex) => {
    console.log('inside Enrolled Courses Of Student Component')
    //when student is logged in
    let userId = studentId;
    //when admin is logged in
    if (!userId) {
        userId = Cookies.get('userId')
    }
    return axios.get(`http://localhost:8081/api/students/${userId}/courses`,
        {
            params: {
                page: pageIndex
            },
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
}

export const getAllStudents = async (pageIndex) => {

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

export const getAllTeachers = async (pageIndex) => {
    return axios.get('http://localhost:8081/api/teachers', {
        params: {
            page: pageIndex
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

export const fileSelectedHandler = (event, setFile) => {
    setFile(event.target.files[0])
}