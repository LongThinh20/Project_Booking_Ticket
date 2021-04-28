import React from 'react';
import Swal from 'sweetalert2'

export default function SilderItemsComingSoon(props) {
    const showModal = () => {
        Swal.fire({
            title: '',
            icon: '',
            html:
                ` <iframe width="400" height="315" src=${props.item.trailer} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,

        })
    }
    return (
        <div className="itemComingSoon carousel__detail">
            <div className="newIn__img img-fluid">
                <img src={props.item.hinhAnh} alt="" />
                <div className="overlay" />
                <div className="newIn__play">
                    <a onClick={() => { showModal() }} href="#/">
                        <i className="fa fa-play d-block" />
                    </a>
                </div>
            </div>
            <div className="newIn__text">
                <div className="name"><span>P</span> {props.item.tenPhim}</div>
                <div className="time">120 phút</div>
            </div>
            <div>
            </div>
        </div>
    )
}
