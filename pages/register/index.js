import {useRouter} from "next/router";
import React, {useState} from "react";
import {RegisterUser} from "../../lib/lib";

const handleSubmit = async (setRole, router, state) => {
    let select = document.getElementById('role');
    state['role'] = select.options[select.selectedIndex].text;
    RegisterUser(state).then(res => {
        if (res.data.success && res.data.success === true) {
            router.push('/login');
        } else {
            window.alert("failed to register user");
        }
    }).catch(err => console.log("Error ", err));
}

export default function Register() {

    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    return (
        <div className="container">
            <div className="row ">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <h1 className="col-lg-12 login-title text-uppercase">
                        Please register
                    </h1>
                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form onSubmit={() => handleSubmit(setRole, router, {
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                password: password,
                                role: role
                            })}>
                                <div className="form-group mb-3">
                                    <label className="form-control-label">FIRST NAME</label>
                                    <input type="firstName"
                                           className="form-control"
                                           name="firstName"
                                           placeholder="First Name"
                                           required
                                           onChange={() => setFirstName(event.target.value)}/></div>
                                <div className="form-group mb-3">
                                    <label className="form-control-label">LAST NAME</label>
                                    <input type="lastName"
                                           className="form-control"
                                           name="lastName"
                                           placeholder="Last Name"
                                           required
                                           onChange={() => setLastName(event.target.value)}/></div>
                                <div className="form-group mb-3">
                                    <label className="form-control-label">USERNAME</label>
                                    <input type="email"
                                           className="form-control"
                                           name="email"
                                           placeholder="USERNAME or EMAIL"
                                           required
                                           onChange={() => setEmail(event.target.value)}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-control-label">PASSWORD</label>
                                    <input type="password"
                                           className="form-control"
                                           name="password"
                                           placeholder="Password"
                                           required
                                           size="30"
                                           onChange={() => setPassword(event.target.value)}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-control-label">Role</label>
                                    <select id="role" name="role"
                                            className="position-relative w-100 select-height">
                                        <option value="student"> STUDENT
                                        </option>
                                        <option value="teacher"> TEACHER
                                        </option>
                                    </select>
                                </div>
                                <div className="col-lg-12 loginbttm position-relative" type="submit">
                                    <div className="col-lg-6 login-btm login-button">
                                        <button type="submit" className="btn btn-primary position-absolute w-100">
                                            REGISTER
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>
    );
}

