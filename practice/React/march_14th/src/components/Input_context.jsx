import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const Input_context = createContext();

export const Input_context_Provider = ({ children }) => {
    // const a = children;
    const [userInput, setUserInput] = useState({
        'FirstName': '',
        'LastName': '',
        'Address': '',
        'Mobilenum': '',
        'Email': '',
        'District': '',
        'State': '',
        'Pincode': '',
    });

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

    useEffect(() => {
        const storedFirstName = sessionStorage.getItem('userInput.FirstName');
        const storedLastName = sessionStorage.getItem('userInput.LastName');

        if (storedFirstName) {
            // setFirstName(storedFirstName);
            setUserInput('FirstName', storedFirstName)
        }
        if (storedLastName) {
            // setLastName(storedLastName);
            setUserInput('LastName', storedLastName)
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('FirstName', JSON.stringify(userInput.FirstName));
    }, [userInput.FirstName]);

    useEffect(() => {
        sessionStorage.setItem('LastName', JSON.stringify(userInput.LastName))
    }, [userInput.LastName]);

    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fileStatus, setFileStatus] = useState(false);

    const [Gender, setGender] = useState(null);

    const FirstNameref = useRef();
    const LastNameref = useRef();
    const Genderref = useRef();
    const Addressref = useRef();
    const Mobilenumref = useRef();
    const Emailref = useRef();

    const Districtref = useRef();
    const Stateref = useRef();
    const Pincoderef = useRef();
    const PhotoIdref = useRef();

    const [inputArray, setInputArray] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const navigateTo = useNavigate();

    var input_Data;

    function handleSubmit(event) {
        // event.preventDefault();

        setError({
            firstNameerror: false,
            lastNameerror: false,
            addressError: false,
            mobNumerror: false,
            emailError: false,
            photoid: false,
            districtError: false,
            stateError: false,
            pinCodeError: false,
        });


        const regex = /[a-zA-Z]/;
        let val = regex.test(userInput.Mobilenum); //returns false when the validation is correct

        setShowPopup(false);
        if (userInput.FirstName.length < 4) {
            setErrorMessage('Enter valid First Name');
            setShowPopup(true);
            setError(prevState => ({
                ...prevState,
                firstNameerror: true
            }));
            FirstNameref.current.focus();
        }
        else if (userInput.LastName.length < 4) {
            setErrorMessage('Enter valid Last Name');
            setShowPopup(true);
            setError(prevState => ({
                ...prevState,
                lastNameerror: true
            }));
            LastNameref.current.focus();
        }
        else if (Gender === null) {
            event.preventDefault();
            setErrorMessage('Choose valid Gender');
            setShowPopup(true);
            setError(prevState => ({
                ...prevState,
                genderError: true
            }));
            Genderref.current.focus();
        }
        else if (userInput.Address.length < 10) {
            setErrorMessage('Enter valid Address');
            setShowPopup(true);
            setError(prevState => ({
                ...prevState,
                addressError: true
            }));
            Addressref.current.focus();
        }
        else if (userInput.Mobilenum.length < 10 || val === true) {
            setErrorMessage('Enter valid Mobile number');
            setShowPopup(true);
            setError(prevState => ({
                ...prevState,
                mobNumerror: true
            }));
            Mobilenumref.current.focus();
        }
        else if (!(userInput.Email.includes('@') && userInput.Email.includes('.com') && userInput.Email.length > 10)) {
            setErrorMessage('Enter valid Email id');
            setShowPopup(true);
            setError(prevState => ({
                ...prevState,
                emailError: true
            }));
            Emailref.current.focus();
        }
        else if (fileStatus !== true) {
            event.preventDefault();
            setErrorMessage('Upload Photo Id');
            setShowPopup(true);
            setError(prevState => ({
                ...prevState,
                photoid: true
            }));
            PhotoIdref.current.focus();
        }
        else if (userInput.District.length < 4) {
            setErrorMessage('Enter valid District');
            setShowPopup(true);
            setError(prevState => ({
                ...prevState,
                districtError: true
            }));
            Districtref.current.focus();
        }
        else if (userInput.State.length < 4) {
            setErrorMessage('Enter valid State');
            setShowPopup(true);
            setError(prevState => ({
                ...prevState,
                stateError: true
            }));
            Stateref.current.focus();
        }
        else if (userInput.Pincode.length !== 6) {
            event.preventDefault();
            setErrorMessage('Enter valid PinCode');
            setShowPopup(true);
            setError(prevState => ({
                ...prevState,
                pinCodeError: true
            }));
            Pincoderef.current.focus();
        }
        else {
            event.preventDefault();
            setErrorMessage('All fields are correct');
            setShowPopup(true);
            handlePost();
        }


        // console.log(userInput.FirstName);
        // console.log(userInput.LastName);
        // console.log(Gender);
        // console.log(userInput.Address);
        // console.log(userInput.Mobilenum);
        // console.log(userInput.Email);
        // console.log(userInput.District);
        // console.log(userInput.State);
        // console.log(userInput.Pincode);


        // const jsonData = {
        //     firstname: userInput.FirstName,
        //     lastname: userInput.LastName,
        //     gender: Gender,
        //     address: userInput.Address,
        //     mobilenum: userInput.Mobilenum,
        //     email: userInput.Email,
        //     district: userInput.District,
        //     state: userInput.State,
        //     pincode: userInput.Pincode,
        // }

        // console.log("Json Data : ", jsonData);
        // setInputArray(prevArray => [...prevArray, jsonData]);
        // console.log(inputArray);
    }

    function handlePost() {
        // input_Data = `FirstName: ${userInput.FirstName}\n` +
        //     `LastName: ${userInput.LastName}\n` +
        //     `Gender: ${Gender}\n` +
        //     `Address: ${userInput.Address}\n` +
        //     `MobileNum: ${userInput.Mobilenum}\n` +
        //     `EmailId: ${userInput.Email}\n` +
        //     `PhotoId: ${selectedImage}\n` +
        //     `District : ${userInput.District}\n` +
        //     `State : ${userInput.District}\n` +
        //     `Pincode : ${userInput.Pincode}\n`;

        // console.log("input_Data : ", input_Data);

        const imageData = {
            selectedImage,
        };

        const postData = {
            FirstName: userInput.FirstName,
            LastName: userInput.LastName,
            Gender: Gender,
            Address: userInput.Address,
            MobileNum: userInput.Mobilenum,
            EmailId: userInput.Email,
            // PhotoId: selectedImage, //comment to not post
            PhotoId: imageData,
            District: userInput.District,
            State: userInput.State,
            Pincode: userInput.Pincode
        };



        axios.post('http://localhost:4000/Input_data', postData)
            .then(
                (data) => {
                    navigateTo('/registration_success');
                }
            )
            .catch(
                (error) => {
			console.log(error);	
                    alert('Registration unsuccessful')
                }
            )
    }

    function handleChange(inputIdentifier, newValue) {
        setUserInput(prevUserInput => {
            return {
                ...prevUserInput,
                [inputIdentifier]: newValue
            };
        });
    }

    function handleGenderChange(event) {
        setGender(event.target.value);
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFileStatus(true);
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        else {
            setFileStatus(false);
            setErrorMessage('Upload only image file');
            setShowPopup(true);
        }

    }

    function handleClearAll() {
        handleChange('FirstName', '');
        handleChange('LastName', '');
        // handleChange('Gender', '');
        setGender('');

        handleChange('Address', '');
        handleChange('Mobilenum', '');
        handleChange('Email', '');
        setSelectedImage(null);
        handleChange('District', '');
        handleChange('State', '');
        handleChange('Pincode', '');
        PhotoIdref.current.value = null;

    }


    return (
        <Input_context.Provider
            value={{
                userInput,
                errorMessage,
                error,
                Gender,
                selectedImage,
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
            }}>
            {children}
        </Input_context.Provider>
    );

};
