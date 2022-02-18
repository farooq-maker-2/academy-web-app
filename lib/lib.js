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
    axios.post(publicRuntimeConfig.serverBaseUrl + '/api/users/login', data,
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
        } else {
            window.alert('wrong username or password')
        }
    }).catch(err => console.log("Error ", err));
}

export const logout = async (router) => {
    //invalidate cookies
    let c = document.cookie.split("; ");
    for (let i in c)
        document.cookie = /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await router.push('/login');
}

export const deactivateUser = async (id, role) => {

    event.preventDefault();
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
    try {
        const userId = Cookies.get('userId');
        return axios.post(publicRuntimeConfig.serverBaseUrl + `/api/students/${userId}/courses/${courseId}`, null, {
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
            pageSize: 20 //publicRuntimeConfig.pageSize
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

export const reFetchCourses = async (pageIndex, setCourses) => (
    getAllCourses(pageIndex).then(res => {
        if (res.data.success && res.data.success === true) {
            setCourses(res.data.data.content)
        } else {
            window.alert("failed to fetch courses")
        }
    }).catch(err => console.log("Error ", err))
)

export const routeToAllCoursesOfStudent = async (studentId, router) => {
    await router.push({
        pathname: '/all_courses_of_student',
        query: {studentId: studentId}
    })
};

export const routeToTeacherCourseDetails = async (course, router) => {
    return router.push({
        pathname: '/course_details',
        query: {courseId: course.id}
    })
};

export const routeTOAllCoursesOfTeacher = async (teacher, router) => {
    router.push({
        pathname: '/all_courses_of_teacher',
        query: {teacherId: teacher.id}
    });
}

export const routeToAddCourse = async (router) => {
    return router.push('/add_course');
}

export const routeToAllTeachers = async (router) => {
    router.push('/all_teachers');
}

export const routeToAllStudents = async (router) => {
    router.push('/all_students');
}

export const downloadContent = async (courseId, content) => {
    try {
        const contentName = content.fileName;
        let res = await axios.get(publicRuntimeConfig.serverBaseUrl + `/api/courses/${courseId}/contents/${contentName}`, {
            responseType: 'blob',
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        })
        if (res.status && res.status === 200) {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', contentName)
            // Append to html link element page
            document.body.appendChild(link);
            // Start download
            link.click();
            // Clean up and remove the link
            link.parentNode.removeChild(link);
        } else {
            window.alert("failed to download")
        }
    } catch (err) {
        console.log(err);
    }
};