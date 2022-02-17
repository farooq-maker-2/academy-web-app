import {useRouter} from "next/router";
import React, {useState} from "react";
import {loginUser} from "../../lib/lib";

const handleSubmit = async (email, password, router) => {
    event.preventDefault()
    console.log(email + password)
    loginUser(email, password, router);
}

export default function Login() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="container">
            <div className="row ">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <h1 className="col-lg-12 login-title text-uppercase">
                        Please sign in
                    </h1>
                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form onSubmit={() => handleSubmit(email, password, router)}>
                                <div className="form-group">
                                    <label className="form-control-label">USERNAME</label>
                                    <input type="email"
                                           className="form-control"
                                           name="email"
                                           placeholder="email"
                                           required
                                           onChange={() => setEmail(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">PASSWORD</label>
                                    <input type="password"
                                           className="form-control"
                                           name="password"
                                           placeholder="Password"
                                           required
                                           size="30"
                                           onChange={() => setPassword(event.target.value)}/>
                                </div>
                                <div className="col-lg-12 loginbttm position-relative" type="submit">
                                    <div className="col-lg-6 login-btm login-button">
                                        <button type="submit" className="btn btn-primary position-absolute w-100">
                                            LOGIN
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
