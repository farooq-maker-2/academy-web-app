import React from "react";
import {loginUser} from '../../lib/auth';
import styles from './LoginForm.module.css'

class LoginForm extends React.Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
        console.log([event.target.name])
        console.log(this.state)
    }

    handleSubmit = async () => {
        event.preventDefault()
        const {email, password} = this.state;
        console.log(this.state);
        await loginUser(email, password, this.props.router);
    }

    render() {

        return (

            // <form onSubmit={this.handleSubmit} className="form-signin text-center">
            //     <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            //     <input type="email"
            //            name="email"
            //         /*                       className="form-signin form-control"*/
            //            className="form-signin"
            //            placeholder="email"
            //            required
            //            size="30"
            //            onChange={this.handleChange}/>
            //     <br/>
            //
            //     <input type="password"
            //            name="password"
            //            className="form-signin"
            //            placeholder="Password"
            //            required
            //            size="30"
            //            onChange={this.handleChange}/>
            //
            //     <br/>
            //     <button className={styles.button}
            //             type="submit">Sign in
            //     </button>
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
                                Please sign in
                            </h1>

                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label className="form-control-label">USERNAME</label>
                                            <input type="email"
                                                   className="form-control"
                                                   name="email"
                                                   placeholder="email"
                                                   required
                                                   onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">PASSWORD</label>
                                            <input type="password"
                                                   className="form-control"
                                                   name="password"
                                                   placeholder="Password"
                                                   required
                                                   size="30"
                                                   onChange={this.handleChange}/>
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
            // </form>
        );
    }

}


//className="w-auto btn btn-lg btn-primary "

export default LoginForm;