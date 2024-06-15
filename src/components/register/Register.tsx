import { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = ({ handleClickChild, handleClickChild2 }) => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const isValidUser = USER_REGEX.test(user);
        const isValidPwd = PWD_REGEX.test(pwd);

        if (!isValidUser || !isValidPwd || pwd !== matchPwd) {
            setErrMsg('Invalid input');
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL, { user, pwd }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            
            console.log(response.data);
            setSuccess(true);
            setUser('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <Fragment>
            <div className="bg-form">
                <div className="ps-form"></div>
                <div className="login-form">
                    <div className="test">
                        <div className="main">
                            <div className="switch is-txr" id="switch-cnt">
                                <div className="switch__circle"></div>
                                <div className="switch__circle switch__circle--t"></div>
                                <div className="switch__circle"></div>
                                <div className="switch__container" id="switch-c1">
                                    <h2 className="switch__title title">Welcome Back !</h2>
                                    <p className="switch__description description">To keep connected with us please login with your personal info</p>
                                    <button className="switch__button button switch-btn" onClick={ handleClickChild2 }>SIGN IN</button>
                                </div>
                            </div>

                            <div className="container a-container is-txl" id="a-container">
                                <form className="form" id="a-form" onSubmit={ handleSubmit }>
                                    <p ref={ errRef } className={ errMsg ? "errmsg" : "offscreen" } aria-live="assertive">{ errMsg }</p>
                                    <h2 className="form_title title">Create Account</h2>
                                    <div className="form__icons">
                                        {/* Your icons */}
                                    </div>
                                    <div className="form__group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={ user }
                                            onChange={(e) => setUser(e.target.value)}
                                            ref={ userRef }
                                            required
                                        />
                                        {!validName && <p className="error-msg">Invalid username format</p>}
                                    </div>
                                    <div className="form__group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={ email }
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        {!validEmail && <p className="error-msg">Invalid email format</p>}
                                    </div>
                                    <div className="form__group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={ pwd }
                                            onChange={(e) => setPwd(e.target.value)}
                                            required
                                        />
                                        {!validPwd && <p className="error-msg">Password must be 8-24 characters, with at least one lowercase letter, one uppercase letter, one number, and one special character</p>}
                                    </div>
                                    <div className="form__group">
                                        <label htmlFor="confirm-password">Confirm Password</label>
                                        <input
                                            type="password"
                                            id="confirm-password"
                                            value={ matchPwd }
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            required
                                        />
                                        {!validMatch && <p className="error-msg">Passwords do not match</p>}
                                    </div>
                                    <button type="submit" className="submit-btn">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;
