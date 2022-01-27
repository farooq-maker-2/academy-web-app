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
        console.log('userId ' + userId)
        console.log('courseId ' + courseId)


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

    console.log('Inside opt out function')
    console.log(courseId)
    try {
        let userId = studentId;
        if (!userId) {
            userId = Cookies.get('userId')
        }
        console.log('userId ' + userId)
        console.log('courseId ' + courseId)
        const res = await axios.put(publicRuntimeConfig.serverBaseUrl + `/api/students/${userId}/courses/${courseId}`, {}, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });

        if (res.status && res.status === 200) {
            setCourses(courses.filter(course => {
                return course.id !== courseId
            }));
        } else {
            console.log("failed to opt out!!!")
        }
    } catch (err) {
        console.log(err);
    }
};

export const getAllCourses = async (pageIndex, access_token) => {
    if (!access_token) {
        access_token = Cookies.get('access_token')
    }
    return await axios.get((publicRuntimeConfig.serverBaseUrl + '/api/courses'), {
        params: {
            page: pageIndex
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + access_token
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

    return axios.get(publicRuntimeConfig.serverBaseUrl + `/api/teachers/${userId}/courses`, {
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
    return axios.get(publicRuntimeConfig.serverBaseUrl + `/api/students/${userId}/courses`,
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
    return axios.get(publicRuntimeConfig.serverBaseUrl + '/api/students', {
        params: {
            page: pageIndex
        },
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

export const getAllTeachers = async (pageIndex) => {
    return axios.get(publicRuntimeConfig.serverBaseUrl + '/api/teachers', {
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

export const getTrendingCourses = async () => {

    console.log('inside TrendingCourses Component')
    return axios.get(publicRuntimeConfig.serverBaseUrl + '/api/courses/top_trending', {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

export const getAllTimeBestCourses = async () => {
    console.log('inside All Time Best Courses Component')
    return axios.get(publicRuntimeConfig.serverBaseUrl + '/api/courses/all_time_top_ten', {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    });
};

export const getCourseContents = async (courseId) => {

    if (courseId && courseId !== null) {
        return await axios.get(publicRuntimeConfig.serverBaseUrl + `/api/courses/${courseId}/contents`, {
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
    } else {
        console.log("failed to fetch course content");
    }
};

export const deleteCourse = async (courses, courseId, setCourses) => {
    return await axios.delete(publicRuntimeConfig.serverBaseUrl + `/api/courses/${courseId}`, {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    }).then(res => {
        if (res && res.status === 200) {
            setCourses(courses.filter(course => {
                return course.id !== courseId
            }));
        } else {
            console.log("failed to opt out!!!")
        }
    }).catch(err => console.log("Error ", err));
}