import React from 'react';
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {deactivateUser, logout} from "../lib/lib";

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

    const deactivate = async () => {
        deactivateUser().then(res => {
            if (res.data.success && res.data.success === true) {
                //invalidate cookies
                let c = document.cookie.split("; ");
                for (let i in c)
                    document.cookie = /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                router.push('/register');
            } else {
                window.alert("failed to deactivate user")
            }
        });
    }

    let menu;
    let account;
    if (Cookies.get('access_token')) {
        account = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <a className="nav-link active nav-item-text" onClick={deactivate}>Deactivate</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link active nav-item-text" onClick={() => logout(router)}>Logout</a>
                </li>
            </ul>
        )
    }

    if (!Cookies.get('access_token')) {
        menu = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link href="/login">
                        <a className="nav-link active nav-item-text">Login</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/register">
                        <a className="nav-link active nav-item-text">Register</a>
                    </Link>
                </li>
            </ul>
        )
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'student') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item nav-link active nav-item-text">
                    <Link href="/home">
                        Home
                    </Link>
                </li>
                <li className="nav-item nav-link active nav-item-text">
                    <Link href="/all_courses">
                        Courses
                    </Link>
                </li>
            </ul>
        )
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'teacher') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item nav-link active nav-item-text">
                    <Link href="/home">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link active nav-item-text"
                       onClick={() =>
                           router.push('/add_course')}>
                        Upload Course
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active nav-item-text"
                       onClick={() => {
                           router.push('/all_courses')
                       }}>Courses
                    </a>
                </li>
            </ul>
        )
    } else if (Cookies.get('access_token') && Cookies.get('role') === 'admin') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item nav-link active nav-item-text">
                    <Link href="/home">
                        Home
                    </Link>
                </li>
                <li className="nav-item nav-link active nav-item-text">
                    <Link href="/all_students">
                        All Students
                    </Link>
                </li>
                <li className="nav-item nav-link active nav-item-text">
                    <Link
                        href="/all_teachers"
                        className="nav-link active nav-item-text">
                        All Teachers
                    </Link>
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

            <nav className="navbar navbar-expand-sm bg-dark mb-0"
                 styles="background-color: #1884b5">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        {menu}
                    </div>
                    <div className="navbar-brand">
                        {account}
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
