import axios from 'axios';
import Cookies from "js-cookie";
import {publicRuntimeConfig} from "../next.config";

export const RegisterUser = (data) => {
    event.preventDefault();
    return axios.post(publicRuntimeConfig.serverBaseUrl + '/api/users/register', data);
}

export const loginUser = (email, password, router) => {

    event.preventDefault();
    console.log("loginUser:");
    const data = {
        email,
        password
    }
    return axios.post(publicRuntimeConfig.serverBaseUrl + '/api/users/login', data,
        {
            params: {
                email,
                password
            }
        }
    ).then(res => {
        if (res.data.success && res.data.success === true) {
            Cookies.set("access_token", res.headers["access_token"]);
            Cookies.set("userId", res.data.data.id);
            Cookies.set("role", res.data.data.role);
            router.push('/home')
        }
    }).catch(err => console.log("Error ", err));
}

export const deactivateUser = async (id, role) => {

    event.preventDefault();
    console.log("deactivate user:");
    let userId = id;
    let userRole = role;
    if (!userId) {
        userId = Cookies.get('userId');
    }
    if (!userRole) {
        userRole = Cookies.get('role');
    }
    return axios.delete(publicRuntimeConfig.serverBaseUrl + `/api/users/${userId}/deactivate/${userRole}`, {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
}

export const enrollStudentToCourse = async (courseId) => {

    console.log('Inside enroll function')
    try {
        const userId = Cookies.get('userId');

        return axios.post(publicRuntimeConfig.serverBaseUrl + `/api/students/${userId}/courses/${courseId}`, null, {
            //get page number programmatically
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const optOutHandler = async (studentId, courseId, courses, setCourses) => {

    console.log(courseId)
    try {
        let userId = studentId;
        if (!userId) {
            userId = Cookies.get('userId')
        }
        const res = await axios.put(publicRuntimeConfig.serverBaseUrl + `/api/students/${userId}/courses/${courseId}`, {}, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });

        if (res.data.success && res.data.success === true) {
            setCourses(courses.filter(course => {
                return course.id !== courseId
            }));
        } else {
            window.alert("failed to opt out!!!")
        }
    } catch (err) {
        console.log(err);
    }
};

export const getAllCourses = async (pageIndex) => {
    return axios.get((publicRuntimeConfig.serverBaseUrl + '/api/courses'), {
        params: {
            page: pageIndex,
            pageSize: publicRuntimeConfig.pageSize
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
}

export const getAllCoursesOfTeacher = async (teacherId, pageIndex) => {
    //when teacher is logged in
    let userId = teacherId;
    //when admin ris logged in
    if (!userId) {
        userId = Cookies.get('userId')
    }

    return axios.get(publicRuntimeConfig.serverBaseUrl + `/api/teachers/${userId}/courses`, {
        params: {
            page: pageIndex,
            pageSize: publicRuntimeConfig.pageSize
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

export const getEnrolledCoursesOfStudent = async (studentId, pageIndex) => {
    //when student is logged in
    let userId = studentId;
    //when admin is logged in
    if (!userId) {
        userId = Cookies.get('userId')
    }
    return axios.get(publicRuntimeConfig.serverBaseUrl + `/api/students/${userId}/courses`,
        {
            params: {
                page: pageIndex,
                pageSize: publicRuntimeConfig.pageSize
            },
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
}

export const getAllStudents = async (pageIndex) => {

    return axios.get(publicRuntimeConfig.serverBaseUrl + '/api/students', {
        params: {
            page: pageIndex,
            pageSize: publicRuntimeConfig.pageSize
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

export const getAllTeachers = async (pageIndex) => {
    return axios.get(publicRuntimeConfig.serverBaseUrl + '/api/teachers', {
        params: {
            page: pageIndex,
            pageSize: publicRuntimeConfig.pageSize
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

export const fileSelectedHandler = (event, setFile) => {
    setFile(event.target.files[0])
}

export const getTrendingCourses = async () => {

    return axios.get(publicRuntimeConfig.serverBaseUrl + '/api/courses/top_trending', {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

export const getAllTimeBestCourses = async () => {
    return axios.get(publicRuntimeConfig.serverBaseUrl + '/api/courses/all_time_top_ten', {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

export const getCourseContents = async (courseId) => {

    if (courseId && courseId !== null) {
        return axios.get(publicRuntimeConfig.serverBaseUrl + `/api/courses/${courseId}/contents`, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
    } else {
        window.alert("courseId is null");
    }
};

export const deleteCourse = async (courseId) => {
    return axios.delete(publicRuntimeConfig.serverBaseUrl + `/api/courses/${courseId}`, {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
}