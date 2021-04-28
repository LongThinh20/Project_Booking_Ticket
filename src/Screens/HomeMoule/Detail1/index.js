import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { movieService } from '../../../Service';
import { NavLink, useParams } from 'react-router-dom';
import usePageLoading from '../../../Components/Hook/usePageLoading'
import '../../../Sass/Components/backgroundMovie.scss';
import '../../../Sass/Components/button_Trailer.scss';
import '../../../Layouts/detail.scss';
import { Rate } from 'antd';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'



export default function DetailMovie1(props) {

    const [lstmovieDetail, setlstmovieDetail] = useState({});
    const [lstmovie, setlstmovie] = useState([]);
    const credentials = useSelector(state => state.user.credentials);
    const [ratingValues, setratingValues] = useState(0)
    const [loader, showLoader, hideLoader] = usePageLoading();
    const [view, setview] = useState(false);
    let param = useParams();


    useEffect(() => {
        showLoader();
        movieService.fetchMovieDetail(param.Id)
            .then(res => {
                hideLoader();
                let lstdetailMovie = res.data;
                setlstmovieDetail(lstdetailMovie)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, []);

    const imgStyle = {
        backgroundImage: `url(${lstmovieDetail.hinhAnh})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
    }

    useEffect(() => {
        movieService.fetchShowtimeToIdMovie(param.Id)
            .then(res => {
                let array = res.data;
                setlstmovie(array);
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, [])

    const handleClick = () => {
        if (view === false) {
            setview(true)
        } else {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Bạn đã bình chon rồi !! ',
                showConfirmButton: false,
                timer: 1500
            })

        }
    }
    const handleChange = (values) => {
        if (view) {
            setratingValues(values)
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Cảm ơn bạn đã quan tâm !!',
                showConfirmButton: false,
                timer: 1500
            })
            setview(null)
        }

    }


    return (
        <section className="detail" style={imgStyle}>
            <div className="container">
                <div className="backgroundMovie"></div>
                <div className="row">
                    <div className="col-md-12 col-lg-3 left_content">
                        <div className="button_Trailer">
                            <a href={lstmovieDetail.trailer} data-toggle="modal" data-target="#exampleModalCenter">
                                <i className="fa fa-play d-block" />
                            </a>
                        </div>

                        <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <iframe width="560" height="315" src={lstmovieDetail.trailer} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="myFrame" ></iframe>
                                </div>
                            </div>
                        </div>

                        <div className="detail_Img">
                            <img src={lstmovieDetail.hinhAnh} alt="" ></img>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg right_content">
                        <h1> {lstmovieDetail.tenPhim}</h1>

                        <div className="row mt-4">
                            <div className="col-2 pr-0">
                                <strong className="text-secondary">Ngày :  </strong>
                            </div>
                            <div className="col" >
                                {moment(`${lstmovieDetail.ngayKhoiChieu}`).format('DD.MM.yyyy')}
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-2 pr-0 w-auto">
                                <strong className="text-secondary">Đánh giá:</strong>
                            </div>
                            <div className="col rating" >
                                <i className="fa fa-star" />
                                <div className="rating_Value">
                                    <strong>7.8</strong><span className="text-muted">/10</span>
                                    <span className="rating_View">{lstmovieDetail.danhGia}</span>
                                </div>
                                <button className="btn rating_Btn" onClick={() => { handleClick() }}>Đánh giá</button>

                                {
                                    view ? (<Rate allowHalf value={ratingValues} onChange={(value) => {
                                        handleChange(value)
                                    }} />)
                                        : (<Rate style={{ display: 'none' }} />)
                                }


                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-2 pr-0">
                                <strong className="text-secondary">Mô tả : </strong>
                            </div>
                            <div className="col description" >
                                {lstmovieDetail.moTa}
                            </div>
                        </div>


                    </div>
                </div>

                <div className="center_content">

                    <h3>LỊCH CHIẾU</h3>

                    <div className="logo_detail">
                        <ul className="nav nav-pills ">
                            {
                                lstmovie.heThongRapChieu?.map((item, index) => {
                                    return (
                                        <li className="nav-item" key={index}>
                                            <a className="nav-link " data-toggle="pill" href={`#${item.maHeThongRap}`}>
                                                <img src={item.logo} style={{ height: '50px', width: '50px' }} alt=""></img>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className="tab-content ">
                        {
                            lstmovie.heThongRapChieu?.map((item, index) => {
                                return (
                                    <div className="tab-pane content_showTime " id={item.maHeThongRap}>
                                        {
                                            item.cumRapChieu?.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <h3 >{item.tenCumRap}</h3>
                                                        <p style={{ color: 'white' }}>271 Nguyễn Trãi, Q.1</p>
                                                        {item.lichChieuPhim?.slice(0, 12).map((item, index) => {
                                                            return (
                                                                credentials ? (<NavLink to={`/booking/${item.maLichChieu}`} className="button_ShowTime mr-2 mb-2" target="_blank"><span className="text_Green" style={{ fontSize: '13px' }}>{moment(item.ngayChieuGioChieu).format('DD.MM')}~</span> {moment(item.ngayChieuGioChieu).format('hh:mm a')}</NavLink>)
                                                                    : (<NavLink to={`/signIn`} className="button_ShowTime mr-2 mb-2"><span className="text_Green" style={{ fontSize: '13px' }}>{moment(item.ngayChieuGioChieu).format('DD.MM')}~</span> {moment(item.ngayChieuGioChieu).format('hh:mm a')}</NavLink>)
                                                            )


                                                        })}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>



                </div>
            </div>
            { loader}
        </section >
    )
}
