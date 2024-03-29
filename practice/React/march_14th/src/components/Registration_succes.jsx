import { useNavigate } from 'react-router-dom'
import style from './registration.module.css'
import { TiTick } from "react-icons/ti";
// import { TiTickOutline } from "react-icons/ti";


export default function Registration_succes({ onLogout }) {

    const navigateTo = useNavigate();

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.icon}>
                    <TiTick size={60} />
                    {/* <TiTickOutline size={100}/> */}
                </div>
                <div className={style.success_box}>
                    <p>Registration Successful</p>
                </div>
                <div className={style.button_box}>
                    <button className={style.ok_btn}
                        onClick={() => {
                            navigateTo('/');
                        }}>
                        Register Again
                    </button>
                    <button className={style.ok_btn}
                        onClick={() => {
                            navigateTo('/get');
                        }}>
                        Get
                    </button>

                    <button className={style.ok_btn}
                        onClick={() => {
                            navigateTo('/login');
                            onLogout();
                        }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}