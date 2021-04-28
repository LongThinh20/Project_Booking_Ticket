import React from 'react';
import spiner from '../../img/Spin-1s-211px.gif';
import '../../Layouts/ShowLoader.scss';


const ShowLoader = () => {
    return (
        <div className="loader_container">
            <img src={spiner} className="loader_img" alt=""></img>
        </div>
    )
}

export default ShowLoader;