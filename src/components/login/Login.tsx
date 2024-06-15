import { Fragment, useRef, useState, useEffect } from "react";
// import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import './Login.scss';

// interface LoginComponent {
//     handleClickChild: Function;
//     handleClickChild: Function;
// }

const Login = (props) => {
    const { handleClickChild, handleClickChild2 } = props;
    const { setAuth } = useAuth();

    const userRef = useRef(null);
    const errRef = useRef(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post(
    //             LOGIN_URL,
    //             { user, pwd },
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );

    //         const accessToken = response?.data?.accessToken;
    //         const roles = response?.data?.roles;
    //         setAuth({ user, pwd, roles, accessToken });
    //         setUser('');
    //         setPwd('');
    //         setSuccess(true);
    //     } catch (err) {
    //         if (!err?.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response?.status === 400) {
    //             setErrMsg('Missing Username or Password');
    //         } else if (err.response?.status === 401) {
    //             setErrMsg('Unauthorized');
    //         } else {
    //             setErrMsg('Login Failed');
    //         }
    //         errRef.current.focus();
    //     }
    // };

    return (
        <Fragment>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to="/">Go to Home</Link>
                    </p>
                </section>
            ) : (
                <div className="bg-form">
                    <div className="ps-form"></div>
                    <div className="login-form">
                        <div className="test">
                            <div className="main">
                                <div className="container b-container" id="b-container">
                                    <form className="form" id="b-form">
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" style={{ color: "red" }}>{errMsg}</p>
                                        <h2 className="form_title title">Sign in to Website</h2>
                                        <div className="form__icons">
                                            {/* Assuming these are your icons */}
                                            <img className="form__icon" src="your-icon-path" alt="" />
                                            <img className="form__icon" src="your-icon-path" alt="" />
                                            <img className="form__icon" src="your-icon-path" alt="" />
                                        </div>
                                        <span className="form__span">or use your email account</span>
                                        <input
                                            className="form__input"
                                            type="text"
                                            placeholder="Email"
                                            id="username"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setUser(e.target.value)}
                                            value={user}
                                            required
                                        />
                                        <input
                                            className="form__input"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            required
                                        />
                                        <a className="form__link">Forgot your password?</a>
                                        <button className="form__button button submit" type="submit">SIGN IN</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Login;
