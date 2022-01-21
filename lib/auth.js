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
    return await axios.delete(`http://localhost:8081/api/users/${userId}/deactivate/${userRole}`, {
        headers: {
            AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
        }
    }).then(res => {

        //router.push('/register')

    }).catch(err => console.log("Error ", err));

}

export const enrollStudentToCourse = async (courseId) => {

    console.log('Inside enroll function')
    try {
        const userId = Cookies.get('userId');
        console.log('userId ' + userId)
        console.log('courseId ' + courseId)


        const res = await axios.post(`http://localhost:8081/api/students/${userId}/courses/${courseId}`, null, {
            //get page number programmatically
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });

        return res.status;
    } catch (err) {
        console.log(err);
    }
}