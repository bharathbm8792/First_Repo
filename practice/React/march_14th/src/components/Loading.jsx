import style from './loading.module.css';

import Loading_gif from '../images/Loading.gif';


export default function Loading() {
    return (
        <div className={style.container}>
            <img src={Loading_gif} alt='Loading gif' />
            <h2>Loading...⌛</h2>
        </div>
    )
}
