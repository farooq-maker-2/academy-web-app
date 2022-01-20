import React from 'react';
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {deactivateUser} from "../lib/auth";

const Layout = (props) => {
    const router = useRouter();

    const showAllTimeTopCourses = async () => {
        return router.push('/all_time_best');
    }

    const showAllCoursesOfStudent = async (studentId) => {
        return router.push({
            pathname: '/all_courses_of_student',
            query: {studentId: studentId}
        });
    }

    const searchTeachers = async () => {
        return router.push('/teachers_by_name');
    }


    const showTrendingCourses = async () => {
        return router.push('/top_trending');
    }

    const logout = async () => {
        var c = document.cookie.split("; ");
        for (let i in c)
            document.cookie = /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        await router.push('/login');
    }

    const deactivate = async () => {

        await deactivateUser();
        //invalidate cookies
        var c = document.cookie.split("; ");
        for (let i in c)
            document.cookie = /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        await router.push('/register');
    }

    const addCourse = async () => {
        await router.push('/add_course');
    }

    const getAllCoursesOfTeacher = async () => {
        await router.push('/all_courses_of_teacher');
    }

    const getAllTeachers = async () => {
        await router.push('/all_teachers');
    }

    const getAllStudents = async () => {
        await router.push('/all_students');
    }

    let menu;

    if (!Cookies.get('access_token')) {
        menu = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link href="/login">
                        <a className="nav-link active">Login</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/register">
                        <a className="nav-link active">Register</a>
                    </Link>
                </li>
            </ul>
        )
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'student') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={searchTeachers}>Search Teacher</a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={() => showAllCoursesOfStudent(Cookies.get('userId'))}>Your Courses</a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={showAllTimeTopCourses}>All Time Best</a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={showTrendingCourses}>Trending Courses</a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={deactivate}>Deactivate</a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={logout}>Logout</a>
                </li>
            </ul>
        )
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'teacher') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={getAllCoursesOfTeacher}>Your Courses</a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={addCourse}>Upload New Course</a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={deactivate}>Deactivate</a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={logout}>Logout</a>
                </li>
            </ul>
        )
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'admin') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={getAllStudents}>All Students</a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={getAllTeachers}>All Teachers</a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link active" onClick={logout}>Logout</a>
                </li>
            </ul>
        )
    }

    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
                      rel="stylesheet"
                      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
                      crossOrigin="anonymous"/>
            </Head>

            <nav className="navbar navbar-expand-md bg-dark mb-4"
                 styles="background-color: #1884b5">
                <div className="container-fluid">
                    <Link href="/">
                        <a className="navbar-brand">Home</a>
                    </Link>
                    <div>
                        {menu}
                    </div>
                </div>
            </nav>

            <main className="form-signin">
                {props.children}
            </main>
        </>
    );
};

export default Layout;
