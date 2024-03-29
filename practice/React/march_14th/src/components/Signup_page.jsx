import { useRef, useState } from 'react';
import style from './signup.module.css';
import axios from 'axios';

// import img from '/home/bharathbm/practice/React/march_14th/src/images/Email.jpg';

// import { AiTwotoneMail } from "react-icons/ai";

// import { PiLockKeyDuotone } from "react-icons/pi";
// import { PiLockKeyOpenDuotone } from "react-icons/pi";

import { IoMdEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


export default function Signup_page() {

    const [userInput, setUserInput] = useState({
        Email: '',
        PassWord: '',
    });

    const [RePassWord, setReenterPwd] = useState('');


    function handleChange(inputIdentifier, newValue) {
        setUserInput(prevUserInput => {
            return {
                ...prevUserInput,
                [inputIdentifier]: newValue
            };
        });
    }

    const [viewPwd, setViewPwd] = useState(false);

    function handleViewPwd() {
        setViewPwd(!viewPwd);
    }

    const navigateTo = useNavigate();

    const [email_Error, setEmailError] = useState(false);
    const [pwd_Error, setPwdError] = useState(false);
    const [rePwd, setRePwd] = useState(false);
    const [both_pwd, setBoth] = useState(false);

    const [signup_success, setSignupSuccess] = useState(false);

    const email_Ref = useRef();
    const pwd_Ref = useRef();
    const rePwd_ref = useRef();

    function handleSubmit() {

        setEmailError(false);
        setPwdError(false);
        setRePwd(false);
        setBoth(false);

        if (userInput.Email.length < 13) {
            setEmailError(true);
            email_Ref.current.focus();
        }
        else if (!(userInput.Email.includes('@') && userInput.Email.endsWith('mail.com'))) {
            setEmailError(true);
            email_Ref.current.focus();
        }
        else if (userInput.PassWord.length < 8) {
            setPwdError(true);
            pwd_Ref.current.focus();
        }
        else if (RePassWord.length < 8) {
            setRePwd(true);
            rePwd_ref.current.focus();

        }
        else if (userInput.PassWord !== RePassWord) {
            setBoth(true);
            pwd_Ref.current.focus();
        }

        if ((!(userInput.PassWord !== RePassWord) &&
            !(userInput.Email.length < 13) &&
            !(userInput.PassWord.length < 8))) {

            handlePost();
        }
    }

    function handlePost() {
        // if (!email_Error && !pwd_Error && !rePwd && !both_pwd) {

        axios.post('http://localhost:4000/User', userInput)
            .then(
                (data) => {
                    setSignupSuccess(true);
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }


    return (
        <div className={style.signup_body}>
            <div className={style.signup_container}>
                <p className={style.signup_text}>Sign Up</p>
                <div className={style.signup_container_email}>
                    <label>Email</label>
                    <input type='email' value={userInput.Email}
                        className={email_Error ? style.sign_up_error : style.sign_up_no_error}
                        onChange={(event) => { handleChange('Email', event.target.value) }}
                        ref={email_Ref}
                    />
                    {
                        email_Error && <span>Enter Valid Email</span>
                    }
                </div>


                <div className={style.signup_container_password}>
                    <div className={style.signup_container_password_lbl}>
                        <label>Password</label>
                        <div className={style.signup_container_password_ipt}>
                            {
                                !viewPwd &&
                                <input type='password' value={userInput.PassWord}
                                    className={pwd_Error ? style.sign_up_error : style.sign_up_no_error}
                                    onChange={(event) => { handleChange('PassWord', event.target.value) }}
                                    ref={pwd_Ref}
                                />
                            }
                            {
                                viewPwd &&
                                <input type='text' value={userInput.PassWord}
                                    className={pwd_Error ? style.sign_up_error : style.sign_up_no_error}
                                    onChange={(event) => { handleChange('PassWord', event.target.value) }}
                                    ref={pwd_Ref}
                                />
                            }


                            {
                                !viewPwd &&
                                <button onClick={handleViewPwd}
                                    title="Click to View Password">
                                    <IoMdEyeOff size={30} />
                                </button>
                            }
                            {
                                viewPwd &&
                                <button onClick={handleViewPwd}
                                    title="Click to Hide Password">
                                    <IoIosEye size={30} />
                                </button>
                            }
                        </div>
                        {
                            pwd_Error && <span>Enter Valid Password</span>
                        }

                    </div>
                    <div className={style.signup_container_repassword}>
                        <label>Re-enter Password</label>
                        <input type='password' value={userInput.RePassWord}
                            className={pwd_Error || rePwd || both_pwd ? style.sign_up_error : style.sign_up_no_error}
                            onChange={(event) => { setReenterPwd(event.target.value) }}
                            ref={rePwd_ref}
                        // onChange={(event) => { handleChange('RePassWord', event.target.value) }}
                        />
                    </div>
                    {
                        rePwd &&
                        <span>Re-entered password does not match</span>
                    }

                    <div className={style.signup_login_container}>
                        <button className={style.sign_up_button}
                            onClick={handleSubmit}>
                            Submit
                        </button>

                        {
                            signup_success &&
                            <span className={style.signup_success}>
                                Sign Up Successful.
                                <button onClick={() => { navigateTo('/login') }}>
                                    OK
                                </button>
                            </span>

                        }

                        <p>Already have an account ?</p>
                        <button className={style.signup_container_login_button}
                            onClick={() => {
                                navigateTo("/login")
                            }}
                        >
                            Login
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
