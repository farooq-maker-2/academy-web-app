import React from 'react';
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {deactivateUser} from "../lib/lib";

//
// About hyperlinks:
//     The main use of anchor tags - <a></a> - is as hyperlinks.
//     That basically means that they take you somewhere.
//     Hyperlinks require the href property, because it specifies a location.
//
//     Hash:
// A hash - # within a hyperlink specifies an html element id to which the window should be scrolled.
//
//     href="#some-id" would scroll to an element on the current page such as <div id="some-id">.
//
// href="//site.com/#some-id" would go to site.com and scroll to the id on that page.
//
//     Scroll to Top:
//     href="#" doesn't specify an id name, but does have a corresponding location - the top of the page.
//     Clicking an anchor with href="#" will move the scroll position to the top.


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
        let c = document.cookie.split("; ");
        for (let i in c)
            document.cookie = /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        await router.push('/login');
    }

    const deactivate = async () => {

        deactivateUser().then(res => {
            if (res && res.status === 200) {
                //invalidate cookies
                let c = document.cookie.split("; ");
                for (let i in c)
                    document.cookie = /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                router.push('/register');
            }
        });
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
                    <a href="#" className="nav-link active"
                       onClick={() => showAllCoursesOfStudent(Cookies.get('userId'))}>Your Courses</a>
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
                    {/*<Link href="/">*/}
                    <a href="#" className="navbar-brand" onClick={() => {
                        return router.push('/home')
                    }}>Home</a>
                    {/*</Link>*/}
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
