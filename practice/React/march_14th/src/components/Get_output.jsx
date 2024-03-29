import { useState } from 'react';
import style from './output.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

export default function Get_output() {


    const [get, getData] = useState([]);
    const [display, DisplayData] = useState(false);
    const [mobileNum, setMobile_num] = useState('');
    const [error, setError] = useState(false);
    const [get_data_err, setGetdata_error] = useState(false);

    const navigateTo = useNavigate();

    function handleGet() {

        setError(false);
        setGetdata_error(false);
        DisplayData(false);

        if (mobileNum.length !== 10) {
            setError(true);
        }
        else {
            // axios.get('http://localhost:4000/Input_data')
            axios.get(`http://localhost:4000/Input_data?MobileNum=${mobileNum}`)
                .then((data) => {

                    getData(data.data);
                    if (data.data.length !== 0) {
                        handleDisplayData();
                    }
                    else {
                        setGetdata_error(true);
                    }

                })
                .catch((error) => {
                    console.log(error);
                    setGetdata_error(true);
                })
        }
    }

    function handleDisplayData() {
        DisplayData(true);
    }

    function handleEdit(id) {
        navigateTo(`/edit/${id}`)
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:4000/Input_data/${id}`);
        window.location.reload();
    }

    return (
        <div className={style.container}>
            <div className={style.without_table}>
                <label>Enter mobile number to display data</label>
                <input type='text' value={mobileNum}
                    onChange={(event) => {
                        setMobile_num(event.target.value)
                    }}
                />
                {
                    error &&
                    <span>Enter valid mobile number</span>
                }
                <button onClick={handleGet}>Get details</button>
                <button onClick={() => {
                    navigateTo('/');
                }}>
                    Register Again
                </button>
                {
                    get_data_err &&
                    <span>Entered mobile number is not registered</span>
                }
                <div className={style.table}>
                    {
                        display &&
                        get.map(reg => (
                            <table key={reg.id}>
                                <div>
                                    <thead>
                                        <tr>
                                            {/* <th>id</th> */}
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Gender</th>
                                            <th>Address</th>
                                            <th>Mobile Num</th>
                                            <th>Email Id</th>
                                            <th>Photo Id</th>
                                            <th>District</th>
                                            <th>State</th>
                                            <th>Pincode</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {/* <td>{reg.id}</td> */}
                                            <td>{reg.FirstName}</td>
                                            <td>{reg.LastName}</td>
                                            <td>{reg.Gender}</td>
                                            <td>{reg.Address}</td>
                                            <td>{reg.MobileNum}</td>
                                            <td>{reg.EmailId}</td>
                                            <td>
                                                <img src={reg.PhotoId.selectedImage} alt='Photo Id' />

                                            </td>
                                            <td>{reg.District}</td>
                                            <td>{reg.State}</td>
                                            <td>{reg.Pincode}</td>
                                        </tr>
                                    </tbody>
                                </div>
                                <button onClick={() => { handleEdit(reg.id) }}>Edit</button>

                                <Popup
                                    trigger={<button>Delete</button>}
                                    position={"right center"}
                                    closeOnDocumentClick={false}
                                    arrowStyle={{ color: '#000000' }}
                                >
                                    {close => (
                                        <div className={style.popup}>
                                            <p>Are you sure you want to delete?</p>
                                            <button onClick={() => { handleDelete(reg.id); close(); }}>Yes</button>
                                            <button onClick={close}>No</button>
                                        </div>
                                    )}
                                </Popup>
                            </table>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}