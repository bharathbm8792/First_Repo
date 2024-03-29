import { useContext, useState } from 'react';
import { Input_context } from './Input_context';

import { MdOutlineStorage } from "react-icons/md";

import { PiEraserDuotone } from "react-icons/pi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { MdSmartDisplay } from "react-icons/md";



import style from './form_input.module.css';
import { useNavigate } from 'react-router-dom';

export default function Form_input({ onLogout }) {
    const {
        userInput,
        error,
        selectedImage,
        // showPopup,
        // setShowPopup,
        // errorMessage,
        Gender,
        FirstNameref,
        LastNameref,
        Genderref,
        Addressref,
        Mobilenumref,
        Emailref,
        Districtref,
        Stateref,
        Pincoderef,
        PhotoIdref,
        handleChange,
        handleFileSelect,
        handleGenderChange,
        handleSubmit,
        handleClearAll,
    } = useContext(Input_context);


    const [view_btns, setView_btns] = useState(false);

    const navigateTo = useNavigate();

    return (
        <form className={style.container}>
            <div className={style.box}>
                <div className={style.registration_form}>
                    <div className={style.registration_form_2}>
                        <p>Registration Form</p>
                        <div className={style.settings}
                            onMouseLeave={() => { setView_btns(false) }}>
                            <button
                                onMouseEnter={() => { setView_btns(true) }}>
                                <MdOutlineStorage size={30} />
                            </button>
                            <ul>
                                {view_btns &&
                                    <div className={style.clear_all} >
                                        <li>
                                            <button onClick={handleClearAll}
                                                className={style.clear_button}>
                                                <PiEraserDuotone size={25} />
                                                Clear All
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    navigateTo('/get')
                                                }}
                                                className={style.clear_button}>
                                                <MdSmartDisplay size={25} />
                                                Display
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    onLogout();
                                                        navigateTo('/login');
                                                }}
                                                className={style.clear_button}>
                                                < RiLogoutCircleRFill size={25} />
                                                Logout
                                            </button>
                                        </li>

                                    </div>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <label htmlFor="firstName">First Name <span className={style.star}>*</span></label>
                <input
                    type="text"
                    id="firstName"
                    value={userInput.FirstName}
                    onChange={(event) => handleChange('FirstName', event.target.value)}
                    ref={FirstNameref}
                    pattern="[A-Za-z]{4,}"
                    required
                    className={error.firstNameerror ? style.error : style.noerror}
                />
                {error.firstNameerror && <span>Enter valid firstname</span>}
                <label htmlFor="lastName">Last Name <span className={style.star}>*</span></label>
                <input
                    type="text"
                    id="lastName"
                    value={userInput.LastName}
                    onChange={(event) => handleChange('LastName', event.target.value)}
                    ref={LastNameref}
                    pattern="[A-Za-z]{4,}"
                    required
                    className={error.lastNameerror ? style.error : style.noerror}
                />
                {error.lastNameerror && <span>Enter valid lastname</span>}
                <div className={style.gender}>
                    <label htmlFor='gender'>Gender <span className={style.star}>*</span></label>
                    <div className={error.genderError ? style.gender_list_error : style.gender_list}>
                        <div className={style.gender_btn}>
                            <input
                                id='gender'
                                type="radio"
                                value="Male"
                                checked={Gender === "Male"}
                                onChange={handleGenderChange}
                                ref={Genderref}
                                className={style.noerror}
                            />
                            <p>Male</p>
                        </div>
                        <div className={style.gender_btn}>
                            <input
                                type="radio"
                                value="Female"
                                checked={Gender === "Female"}
                                onChange={handleGenderChange}
                                ref={Genderref}
                                className={style.noerror}
                            />
                            <p>Female</p>
                        </div>
                        <div className={style.gender_btn}>
                            <input
                                type="radio"
                                value="Prefer_not_to_say"
                                checked={Gender === "Prefer_not_to_say"}
                                onChange={handleGenderChange}
                                ref={Genderref}
                                className={style.noerror}
                            // className={error.genderError ? style.error : style.noerror}
                            />
                            <p>Prefer Not to Say</p>
                        </div>
                    </div>
                </div>
                {error.genderError && <span>Choose valid gender</span>}
                <label htmlFor="address">Address <span className={style.star}>*</span></label>
                <input
                    type="text"
                    id="address"
                    value={userInput.Address}
                    onChange={(event) => handleChange('Address', event.target.value)}
                    ref={Addressref}
                    pattern="^[a-zA-Z0-9\s.,#-]+$"
                    required
                    className={error.addressError ? style.error : style.noerror}
                />
                {error.addressError && <span>Enter valid address</span>}

                <label htmlFor="mobileNum">Mobile No. <span className={style.star}>*</span></label>
                <input
                    type="tel"
                    id="mobileNum"
                    value={userInput.Mobilenum}
                    onChange={(event) => handleChange('Mobilenum', event.target.value)}
                    ref={Mobilenumref}
                    pattern="^\d{10}$"
                    required
                    className={error.mobNumerror ? style.error : style.noerror}
                />
                {error.mobNumerror && <span>Enter valid mobile number</span>}

                <label htmlFor="email">Email Id <span className={style.star}>*</span></label>
                <input
                    type="email"
                    id="email"
                    value={userInput.Email}
                    onChange={(event) => handleChange('Email', event.target.value)}
                    ref={Emailref}
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    required
                    className={error.emailError ? style.error : style.noerror}
                />
                {error.emailError && <span>Enter valid email</span>}

                <label htmlFor="photoId">Photo Id <span className={style.star}>*</span></label>
                <input
                    type="file"
                    id="photoId"
                    accept='image/*'
                    onChange={handleFileSelect}
                    ref={PhotoIdref}
                    className={error.photoid ? style.error : style.noerror}
                />
                {error.photoid && <span>Upload Photo Id</span>}
                {
                    selectedImage && (
                        <div className={style.uploaded_image}>
                            <p>Uploaded Image:</p>
                            <img src={selectedImage} alt="Uploaded" />
                        </div>
                    )
                }

                <label htmlFor="district">District <span className={style.star}>*</span></label>
                <input
                    type="text"
                    id="district"
                    value={userInput.District}
                    onChange={(event) => handleChange('District', event.target.value)}
                    ref={Districtref}
                    pattern="[A-Za-z]{4,}"
                    required
                    className={error.districtError ? style.error : style.noerror}
                />
                {error.districtError && <span>Enter valid district</span>}

                <label htmlFor="state">State <span className={style.star}>*</span></label>
                <input
                    type="text"
                    id="state"
                    value={userInput.State}
                    onChange={(event) => handleChange('State', event.target.value)}
                    ref={Stateref}
                    pattern="[A-Za-z]{4,}"
                    required
                    className={error.stateError ? style.error : style.noerror}
                />
                {error.stateError && <span>Enter valid state</span>}

                <label htmlFor="pincode">Pincode <span className={style.star}>*</span></label>
                <input
                    type="number"
                    id="pincode"
                    value={userInput.Pincode}
                    onChange={(event) => handleChange('Pincode', event.target.value)}
                    ref={Pincoderef}
                    pattern="^\d{6}$"
                    required
                    className={error.pinCodeError ? style.error : style.noerror}
                />
                {error.pinCodeError && <span>Enter valid pincode</span>}
                <br />
                <button
                    className={style.submit}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                {/* <input
                    type="submit"
                    onClick={handleSubmit}
                    title="Click to Submit"
                /> */}
                {/* {showPopup && (
                    <div>
                        <p>{errorMessage}</p>
                        <button onClick={() => setShowPopup(false)}>
                            Close
                        </button>
                    </div>
                )} */}
            </div >
        </form >
    );
}
