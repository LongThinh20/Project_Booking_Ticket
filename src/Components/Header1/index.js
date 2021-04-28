import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import img from '../../img/logo.svg';
import '../../Layouts/header.scss';
import useScrollTop from 'react-hook-scrolltop';
import Swal from 'sweetalert2';
import { Avatar } from 'antd';
import 'antd/dist/antd.css';

export default function Header1(props) {
    const credentials = useSelector(state => state.user.credentials);

    const isTopOfPage = useScrollTop();

    const handleSignOut = () => {
        if (typeof (Storage) !== 'undefined') {
            localStorage.removeItem('credentials')
            window.location.replace("/")

        } else {
            alert('Trình duyệt của bạn không hỗ trợ localStorage. Hãy nâng cấp trình duyệt để sử dụng!');
        }
    }
    const checkSignOut = () => {
        Swal.fire({
            title: 'Bạn có chắc muốn đăng xuất không ??',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'orange',
            confirmButtonText: 'ĐĂNG XUẤT',
            cancelButtonText: 'HỦY'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Đăng xuất thành công !',
                ).then((result) => {
                    if (result) {
                        handleSignOut()
                    }
                })
            }
        })
    }

    return (
        <header className="header" style={{ backgroundColor: isTopOfPage ? 'black' : 'black' }}>
            <div className="container">

                <div className="header_account row" style={{ display: isTopOfPage ? 'flex' : 'none' }}>
                    <div className="col-6 ">
                        <NavLink className="navbar-brand header-img" to="/">
                            <img src={img} className="img-fluid" alt="" />
                        </NavLink>
                    </div>
                    <div className="col-6 text-center  text-lg-center text-xl-right mt-2 account">
                        <span className="account_icon ">
                            {/* <i className=" fa fa-user-circle mr-2" /> */}
                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>I</Avatar>
                        </span>
                        <div type=" button" className="account_detail btn dropdown-toggle pl-4 pr-4" data-toggle="dropdown">
                            {
                                credentials !== null ? credentials.hoTen : '.......'
                            }
                        </div>
                        {

                            credentials == null
                                ? <div className="dropdown-menu">
                                    <a className="acount_logout dropdown-item" disabled href="/">Thông tin cá nhân</a>
                                </div>
                                : (credentials.maLoaiNguoiDung === 'QuanTri'
                                    ? <div className="dropdown-menu ">
                                        <a className="acount_logout dropdown-item " href="/admin">DashBoard</a>
                                    </div>
                                    : <div className="dropdown-menu ">
                                        <a className="acount_logout dropdown-item " href="/info">Thông tin cá nhân </a>
                                    </div>
                                )

                        }

                    </div>
                </div>

                <nav className=" header__nav navbar navbar-expand-lg navbar-dark">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#movieNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse " id="movieNavbar">
                        <ul className="navbar-nav ">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">TRANG CHỦ</a>
                            </li>
                            <li className="nav-item">

                                <a className="nav-link" href="/#showlstMovie">LỊCH CHIẾU</a>

                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#booking">MUA VÉ</a>
                            </li>
                            {
                                credentials !== null ? <li className="nav-item">
                                    <a className="nav-link" onClick={() => { checkSignOut() }} href="#/" >ĐĂNG XUẤT</a>
                                </li>
                                    : <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeStyle={{ color: 'orange' }} to="/signin" >ĐĂNG NHẬP</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeStyle={{ color: 'orange' }} to="/signup" >ĐĂNG KÍ</NavLink>
                                        </li>
                                    </>

                            }
                        </ul>

                    </div>
                </nav>
            </div>
        </header>


    )
}
