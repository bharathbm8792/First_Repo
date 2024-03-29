import { useEffect, useState } from "react"
import style from './edit.module.css';

import { MdOutlineStorage } from "react-icons/md";

import { PiEraserDuotone } from "react-icons/pi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function Edit({ onLogout }) {

    const [Id, setId] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Gender, setGender] = useState('');
    const [Address, setAddress] = useState('');
    const [MobileNum, setMobNum] = useState('');
    const [EmailId, setEmail] = useState('');
    const [Image, setImage] = useState('');
    const [District, setDistrict] = useState('');
    const [State, setState] = useState('');
    const [Pincode, setPincode] = useState('');

    const [view_btns, setView_btns] = useState(false);

    const navigateTo = useNavigate();

    const edit_id = useParams();

    const [error, setError] = useState({
        'firstNameerror': false,
        'lastNameerror': false,
        'genderError': false,
        'addressError': false,
        'mobNumerror': false,
        'emailError': false,
        'photoid': false,
        'districtError': false,
        'stateError': false,
        'pinCodeError': false,
    });

    const [fileStatus, setFileStatus] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        axios.get(`http://localhost:4000/Input_data/${edit_id.id}`)
            .then((data) => {
                const resp = data.data;
                setId(resp.id);
                setFirstName(resp.FirstName);
                setLastName(resp.LastName);
                setGender(resp.Gender);
                setAddress(resp.Address);
                setMobNum(resp.MobileNum);
                setEmail(resp.EmailId);
                setFileStatus(true);
                setImage(resp.PhotoId.selectedImage);
                setSelectedImage(resp.PhotoId.selectedImage);
                setDistrict(resp.District);
                setState(resp.State);
                setPincode(resp.Pincode);
            })

            .catch((error) => {
                console.log(error);
            })

    }, [edit_id.id]);


    function handleClearAll() {
        setFirstName('');
        setLastName('');
        setGender('');
        setAddress('');
        setMobNum('');
        setEmail('');
        setImage('');
        setDistrict('');
        setState('');
        setPincode('');
    }



    function handleValidation(event) {

        event.preventDefault();

        const nameRegex = /^[a-zA-Z]+$/;
        const mobNumRegex = /^\d+$/;

        let errorState = {
            firstNameerror: false,
            lastNameerror: false,
            genderError: false,
            addressError: false,
            mobNumerror: false,
            emailError: false,
            districtError: false,
            stateError: false,
            pinCodeError: false,
        };

        if ((!nameRegex.test(FirstName)) || (FirstName.length < 4)) {
            errorState.firstNameerror = true;
        }
        if ((!nameRegex.test(LastName)) || (LastName.length < 4)) {
            errorState.lastNameerror = true;
        }
        if (Gender.length === 0) {
            errorState.genderError = true;
        }
        if (Address.length < 8) {
            errorState.addressError = true;
        }
        if (!mobNumRegex.test(MobileNum) || (MobileNum.length !== 10)) {
            errorState.mobNumerror = true;
        }
        if (!(EmailId.includes('@') && EmailId.includes('.com') && EmailId.length > 10)) {
            errorState.emailError = true;
        }
        if (District.length < 5) {
            errorState.districtError = true;
        }
        if (State.length < 4) {
            errorState.stateError = true;
        }
        if (Pincode.length !== 6) {
            errorState.pinCodeError = true;
        }

        setError(errorState);

        // Check if any error exists
        const hasError = Object.values(errorState).some(value => value);

        if (!hasError) {
            // If no error, submit the form
            handleSubmit();
        }
    }


    function handleSubmit() {

        if ((!error.firstNameerror &&
            !error.lastNameerror &&
            !error.genderError &&
            !error.addressError &&
            !error.mobNumerror &&
            !error.emailError &&
            !error.districtError &&
            !error.stateError &&
            !error.pinCodeError)) {

            const imageData = {
                selectedImage,
            };

            const updatedData = {
                id: Id,
                FirstName: FirstName,
                LastName: LastName,
                Gender: Gender,
                Address: Address,
                MobileNum: MobileNum,
                EmailId: EmailId,
                PhotoId: imageData,
                District: District,
                State: State,
                Pincode: Pincode
            }

            axios.put(`http://localhost:4000/Input_data/${edit_id.id}`, updatedData)
                .then((resp) => {
                    alert("Data updation successful");
                    navigateTo('/get');
                    // window.alert("Data updation successful");
                    // window.location.href = "/get";
                })
                .catch((error) => {
                    console.log(error);
                })
        }


    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFileStatus(true);
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        else {
            console.log("Image not proper");
        }

    }

    return (
        <form className={style.container}>
            <div className={style.box}>
                <div className={style.registration_form}>
                    <div className={style.registration_form_2}>
                        <p>Edit Registration Form</p>
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
                    value={FirstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    pattern="[A-Za-z]{4,}"
                    required
                    className={error.firstNameerror ? style.error : style.noerror}
                />
                {error.firstNameerror && <span>Enter valid firstname</span>}
                <label htmlFor="lastName">Last Name <span className={style.star}>*</span></label>
                <input
                    type="text"
                    id="lastName"
                    value={LastName}
                    onChange={(event) => setLastName(event.target.value)}
                    pattern="[A-Za-z]{4,}"
                    required
                    className={error.lastNameerror ? style.error : style.noerror}
                />
                {error.lastNameerror && <span>Enter valid lastname</span>}
                <div className={style.gender}>
                    <label htmlFor='gender'>Gender <span className={style.star}>*</span></label>
                    <div
                        className={error.genderError ? style.gender_list_error : style.gender_list}
                    >
                        <div className={style.gender_btn}>
                            <input
                                id='gender'
                                type="radio"
                                value="Male"
                                checked={Gender === "Male"}
                                onChange={(event) => { setGender(event.target.value) }}
                                className={style.noerror}
                            />
                            <p>Male</p>
                        </div>
                        <div className={style.gender_btn}>
                            <input
                                type="radio"
                                value="Female"
                                checked={Gender === "Female"}
                                onChange={(event) => { setGender(event.target.value) }}
                                className={style.noerror}
                            />
                            <p>Female</p>
                        </div>
                        <div className={style.gender_btn}>
                            <input
                                type="radio"
                                value="Prefer_not_to_say"
                                checked={Gender === "Prefer_not_to_say"}
                                onChange={(event) => { setGender(event.target.value) }}
                                className={style.noerror}
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
                    value={Address}
                    onChange={(event) => setAddress(event.target.value)}
                    pattern="^[a-zA-Z0-9\s.,#-]+$"
                    required
                    className={error.addressError ? style.error : style.noerror}
                />
                {error.addressError && <span>Enter valid address</span>}

                <label htmlFor="mobileNum">Mobile No. <span className={style.star}>*</span></label>
                <input
                    type="tel"
                    id="mobileNum"
                    value={MobileNum}
                    onChange={(event) => setMobNum(event.target.value)}
                    pattern="^\d{10}$"
                    required
                    className={error.mobNumerror ? style.error : style.noerror}
                />
                {error.mobNumerror && <span>Enter valid mobile number</span>}

                <label htmlFor="email">Email Id <span className={style.star}>*</span></label>
                <input
                    type="email"
                    id="email"
                    value={EmailId}
                    onChange={(event) => setEmail(event.target.value)}
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
                    className={error.photoid ? style.error : style.noerror}
                // value={Image}
                />
                {error.photoid && <span>Upload Photo Id</span>}
                {
                    Image && (
                        <div className={style.uploaded_image}>
                            <p>Uploaded Image:</p>
                            <img src={Image} alt="Uploaded" />
                        </div>
                    )
                }

                <label htmlFor="district">District <span className={style.star}>*</span></label>
                <input
                    type="text"
                    id="district"
                    value={District}
                    onChange={(event) => setDistrict(event.target.value)}
                    pattern="[A-Za-z]{4,}"
                    required
                    className={error.districtError ? style.error : style.noerror}
                />
                {error.districtError && <span>Enter valid district</span>}

                <label htmlFor="state">State <span className={style.star}>*</span></label>
                <input
                    type="text"
                    id="state"
                    value={State}
                    onChange={(event) => setState(event.target.value)}
                    pattern="[A-Za-z]{4,}"
                    required
                    className={error.stateError ? style.error : style.noerror}
                />
                {error.stateError && <span>Enter valid state</span>}

                <label htmlFor="pincode">Pincode <span className={style.star}>*</span></label>
                <input
                    type="number"
                    id="pincode"
                    value={Pincode}
                    onChange={(event) => setPincode(event.target.value)}
                    pattern="^\d{6}$"
                    required
                    className={error.pinCodeError ? style.error : style.noerror}
                />
                {error.pinCodeError && <span>Enter valid pincode</span>}
                <br />
                <button
                    className={style.submit}
                    onClick={handleValidation}
                // onClick={handleSubmit}
                >
                    Submit
                </button>

            </div>
        </form>
    )
}