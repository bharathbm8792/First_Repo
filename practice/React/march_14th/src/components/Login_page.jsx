import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

// import './Login_page.css';
import style from './login.module.css';

import axios from 'axios';

import { SiVorondesign } from "react-icons/si";

import { AiTwotoneMail } from "react-icons/ai";

import { PiLockKeyDuotone } from "react-icons/pi";
import { PiLockKeyOpenDuotone } from "react-icons/pi";

import { IoMdEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";




export default function Login_page({ onLogin }) {

    const [view_pwd, setViewPwd] = useState(false);

    function handleViewPwd() {
        setViewPwd(!view_pwd);
    }

    const navigateTo = useNavigate();

    const [userInput, setUserInput] = useState({
        Email: '',
        Password: ''
    });

    const [email_err, setEmailErr] = useState(false);
    const [pwd_err, setPwdErr] = useState(false);

    const emailRef = useRef();
    const pwdRef = useRef();

    function handleChange(inputIdentifier, newValue) {
        setUserInput(prevUserInput => {
            return {
                ...prevUserInput,
                [inputIdentifier]: newValue
            };
        });
    }

    function handleLogin() {

        setEmailErr(false);
        setPwdErr(false);

        if (userInput.Email.length < 13) {
            setEmailErr(true);
            emailRef.current.focus();
        }
        else if (!(userInput.Email.includes('@') && userInput.Email.endsWith('mail.com'))) {
            setEmailErr(true);
            emailRef.current.focus();
        }

        else if (userInput.Password.length < 8) {
            setPwdErr(true);
            pwdRef.current.focus();
        }

        if (!(userInput.Email.length < 13) &&
            (userInput.Email.includes('@') && userInput.Email.endsWith('mail.com')) &&
            !(userInput.Password.length < 8)
        ) {
            handleGet();
        }

    }

    const [email_pwd_correct, setEmail_Pwd_correct] = useState(false);
    let length = 0;

    function handleGet() {
        axios.get('http://localhost:4000/User')
            .then((data) => {
                length = data.data.length;

                if (length === 0) {
                    setEmail_Pwd_correct(true);
                }

                const emails = data.data.map(item => item.Email);
                const passwords = data.data.map(item => item.PassWord);


                for (let i = 0; i < length; i++) {
                    if ((userInput.Email === emails[i]) &&
                        (userInput.Password === passwords[i])) {
                        console.log("valid email and pwd");
                        setEmail_Pwd_correct(false);
                        onLogin();
                        navigateTo('/');
                        break;
                    }
                    else {
                        setEmail_Pwd_correct(true);
                        setEmailErr(true);
                        setPwdErr(true);
                    }
                }

            })

            .catch((error) => {
                console.log(error);
            })


    }


    return (
        <div className={style.login_body}>
            <div className={style.login}>
                <div className={style.image_login}>
                    <SiVorondesign size={50} className={style.icon} />
                </div>
                <div className={style.input_login}>
                    <div className={style.text_caps}>
                        <p className={style.text_caps_INT}>We are</p>
                        <p>INTEGRA</p>
                    </div>
                    <div className={style.text}>
                        <p>Welcome back! Log in to your account </p>
                    </div>
                    <div className={style.input_email}>
                        <AiTwotoneMail size={33} />
                        <input type={style.email}
                            placeholder='Email'
                            value={userInput.Email}
                            className={email_err ? style.input_err : style.input_noerr}
                            onChange={(event) => { handleChange('Email', event.target.value) }}
                            ref={emailRef}
                        />


                    </div>
                    {
                        email_err &&
                        <span>Enter Valid Email</span>
                    }
                    <div className={style.input_pwd}>
                        {!view_pwd &&
                            <PiLockKeyDuotone size={35} />
                        }
                        {view_pwd &&
                            <PiLockKeyOpenDuotone size={35} />
                        }
                        {!view_pwd &&
                            <input type='password'
                                placeholder='Password'
                                value={userInput.Password}
                                onChange={(event) => { handleChange('Password', event.target.value) }}
                                className={pwd_err ? style.input_err : style.input_noerr}
                                ref={pwdRef}
                            />
                        }
                        {view_pwd &&
                            <input type='text'
                                placeholder='Password'
                                value={userInput.Password}
                                onChange={(event) => { handleChange('Password', event.target.value) }}
                                className={pwd_err ? style.input_err : style.input_noerr}
                                ref={pwdRef}
                            />
                        }
                        <div className={style.input_view_pwd}>
                            {!view_pwd &&
                                <button onClick={handleViewPwd}>
                                    <IoMdEyeOff size={25} />
                                </button>
                            }
                            {view_pwd &&
                                <button onClick={handleViewPwd}>
                                    <IoIosEye size={25} />
                                </button>
                            }
                        </div>

                    </div>
                    {
                        pwd_err &&
                        <span>Enter Valid Password</span>
                    }
                    <button className={style.final_button}
                        onClick={handleLogin}>
                        Login
                    </button>
                    {
                        email_pwd_correct &&
                        <span className={style.span_incorrect}>
                            Entered email and password are invalid.
                            Sign Up to create new account.
                        </span>
                    }

                    <div className={style.signup}>
                        <p>Don't have an account ?</p>
                        <button className={style.signup_button}
                            onClick={() => {
                                navigateTo("/signup")
                            }}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
