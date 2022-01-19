//import Cookies from 'js-cookie';
import React from "react";
import {RegisterUser} from '../../lib/auth';

class RegistrationForm extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state);
    }

    handleSubmit = async (event) => {
        console.log(this.state);
        let select = document.getElementById('role');
        this.state.role = select.options[select.selectedIndex].text;
        await RegisterUser(this.state, this.props.router);
        this.props.router.push('/login');

    }

    render() {

        return (

            // <form className="text-center" onSubmit={this.handleSubmit}>
            //     <h1 className="h3 mb-3 fw-normal text-center">Please register</h1>
            //
            //     <input type="firstName"
            //            name="firstName"
            //            className=""
            //            placeholder="firstName"
            //            required
            //            size="30"
            //            onChange={this.handleChange}
            //     /><br/>
            //
            //     <input type="lastName"
            //            name="lastName"
            //            className=""
            //            placeholder="lastName"
            //            required
            //            size="30"
            //            onChange={this.handleChange}
            //     /><br/>
            //
            //     <input type="email"
            //            name="email"
            //            className=""
            //            placeholder="email"
            //            required
            //            size="30"
            //            onChange={this.handleChange}/><br/>
            //
            //     <input type="password"
            //            name="password"
            //            className=""
            //            placeholder="Password"
            //            required
            //            size="30"
            //            onChange={this.handleChange}/><br/><br/>
            //
            //     <select id="role" name="role">
            //         <option value="student"> student
            //         </option>
            //         <option value="teacher"> teacher
            //         </option>
            //     </select>
            //
            //     <br/><br/>
            //     <button className="btn btn-lg btn-primary" type="submit" size="30">Register</button>
            // </form>


            // <form className="container background" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-3 col-md-2"></div>
                        <div className="col-lg-6 col-md-8 login-box">
                            {/*<div className="col-lg-12 login-key">*/}
                            {/*    <i className="fa fa-key" aria-hidden="true"></i>*/}
                            {/*</div>*/}
                            <h1 className="col-lg-12 login-title text-uppercase">
                                Please register
                            </h1>

                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group mb-3">
                                            <label className="form-control-label">FIRST NAME</label>
                                            <input type="firstName"
                                                   className="form-control"
                                                   name="firstName"
                                                   placeholder="First Name"
                                                   required
                                                   onChange={this.handleChange}/></div>
                                        <div className="form-group mb-3">
                                            <label className="form-control-label">LAST NAME</label>
                                            <input type="lastName"
                                                   className="form-control"
                                                   name="lastName"
                                                   placeholder="Last Name"
                                                   required
                                                   onChange={this.handleChange}/></div>
                                        <div className="form-group mb-3">
                                            <label className="form-control-label">USERNAME</label>
                                            <input type="email"
                                                   className="form-control"
                                                   name="email"
                                                   placeholder="USERNAME or EMAIL"
                                                   required
                                                   onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-control-label">PASSWORD</label>
                                            <input type="password"
                                                   className="form-control"
                                                   name="password"
                                                   placeholder="Password"
                                                   required
                                                   size="30"
                                                   onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="form-control-label">Role</label>
                                            <select id="role" name="role"
                                                    className="position-relative w-100 select-height">
                                                <option value="student"> student
                                                </option>
                                                <option value="teacher"> teacher
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
            // </form>


        );
    }

}

export default RegistrationForm;