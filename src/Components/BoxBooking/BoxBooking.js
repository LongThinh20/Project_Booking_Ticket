import React, { useEffect, useState } from 'react'
import '../../Layouts/boxBooking.scss'
import { movieService } from '../../Service';
import moment from 'moment';
import Booking from '../../Screens/HomeMoule/Booking';



function BoxBooking() {

    let [movieList, setmovieList] = useState({});
    const [lstmovie, setlstmovie] = useState({});
    const [idMovie, setIdMovie] = useState(1364)
    const [lstCinemaGroup, setlstCinemaGroup] = useState()
    const [lstShowTime, setlstShowTime] = useState()
    ////////////////////
    let [cinemaList, setcinemaList] = useState({});
    const [idCinema, setidCinema] = useState()
    let [showtimeCinema, setshowtimeCinema] = useState({});
    const [lstMovie_, setlstMovie_] = useState()
    const [lstShowTime_, setlstShowTime_] = useState()
const [IdShowTime, setIdShowTime] = useState()
    // /////////////////
    useEffect(() => {
        movieService.fetchMovie()
            .then(res => {
                let danhSachPhim = res.data;
                setmovieList(danhSachPhim)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, [])

    useEffect(() => {

        movieService.fetchShowtimeToIdMovie(idMovie)
            .then(res => {

                setlstmovie(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, [idMovie]);
    // ///////////////////

    useEffect(() => {
        movieService.fetchCinema()
            .then(res => {
                let danhSachPhim = res.data;
                setcinemaList(danhSachPhim)

            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, []);


    useEffect(() => {
        movieService.fetchShowtimeToCinemaGroup(idCinema)
            .then(res => {
                let lichchieu = res.data;

                setshowtimeCinema(lichchieu)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, [idCinema]);

console.log(IdShowTime);
    const handleBooking = () => {
        window.open(`/booking/${IdShowTime}`, '_blank');
    }

    return (
        <section className="boxBooking">
            <h3>MUA VÉ NHANH</h3>
            <div>
                <ul className="nav nav-tabs box_title">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#home">Theo rạp</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#menu1">Theo phim</a>
                    </li>

                </ul>
                {/* Tab panes */}
                <div className="tab-content box_content">
                    <div className="tab-pane container active" id="home">

                        <select name="cars" id="cars"
                            className="form-control box_item"
                            onChange={(e) => { setidCinema(e.target.value) }}
                        >
                            <option value="volvo">Chọn rạp </option>

                            {
                                Object.entries(cinemaList).map(([index, item]) => {

                                    return (
                                        <option
                                            value={item.maHeThongRap}
                                        >{item.tenHeThongRap}</option>
                                    )
                                }
                                )
                            }
                        </select>

                        <select name="cars" id="cars"
                            className="form-control box_item"
                            onChange={(e) => { setlstMovie_(JSON.parse(e.target.value)) }}
                        >
                            <option value="volvo">Chọn cụm rạp </option>

                            {
                                Object.entries(showtimeCinema).map(([index, item]) => {

                                    return (
                                        Object.entries(item.lstCumRap).map(([index, item]) => {
                                            return (
                                                <option
                                                    value={JSON.stringify(item.danhSachPhim)}
                                                >{item.tenCumRap}</option>
                                            )
                                        })
                                    )
                                }
                                )
                            }
                        </select>
                        <select name="cars" id="cars"
                            className="form-control box_item"
                            onChange={(e) => { setlstShowTime_(JSON.parse(e.target.value)) }}
                        >
                            <option value="volvo">Chọn phim </option>

                            {
                                lstMovie_?.map((item, index) => {

                                    return (

                                        <option
                                            value={JSON.stringify(item.lstLichChieuTheoPhim)}
                                        >{item.tenPhim}</option>
                                    )
                                })

                            }
                        </select>
                        <select name="cars" id="cars"
                            className="form-control box_item"
                            onChange={(e) => { setIdShowTime(e.target.value) }}
                        >
                            <option value="volvo">Chọn thời gian </option>

                            {
                                lstShowTime_?.map((item, index) => {

                                    return (
                                        <option
                                            value={item.maLichChieu}
                                        >{moment(item.ngayChieuGioChieu).format('DD.MM - hh:mm a')}</option>
                                    )
                                })

                            }
                        </select>


                    </div>
                    <div className="tab-pane container fade" id="menu1">



                        <select name="cars" id="cars"
                            className="form-control box_item"
                            onChange={(e) => { setIdMovie(e.target.value) }}
                        >
                            <option value="volvo">Chọn phim </option>

                            {
                                Object.entries(movieList).map(([index, item]) => {

                                    return (
                                        <option
                                            value={item.maPhim}
                                        >{item.tenPhim}</option>
                                    )
                                }
                                )
                            }
                        </select>

                        <select name="cars" id="cars "
                            className="form-control box_item"
                            onChange={(e) => { setlstCinemaGroup(JSON.parse(e.target.value)) }}
                        >
                            <option value="volvo">Chọn rap</option>

                            {
                                lstmovie.heThongRapChieu?.map((item, index) => {
                                    return (
                                        <option value={JSON.stringify(item.cumRapChieu)}>{item.tenHeThongRap}</option>

                                    )
                                })
                            }
                        </select>

                        <select name="cars" id="cars"
                            className="form-control box_item"
                            onChange={(e) => { setlstShowTime(JSON.parse(e.target.value)) }}
                        >
                            <option value="volvo">Chọn cụm rap</option>

                            {
                                lstCinemaGroup?.map((item, index) => {
                                    return (
                                        <option value={JSON.stringify(item.lichChieuPhim)}>{item.tenCumRap}</option>

                                    )
                                })
                            }
                        </select>
                        <select name="cars" id="cars"
                            className="form-control box_item"
                            onChange={(e) => { setIdShowTime(e.target.value) }}
                        >
                            <option value="volvo">Chọn thời gian</option>

                            {
                                lstShowTime?.map((item, index) => {
                                    return (
                                        <option value={item.maLichChieu}>{item.ngayChieuGioChieu}</option>

                                    )
                                })
                            }
                        </select>


                    </div>

                </div>
            </div>


            <button className="btn btn_Booking" onClick={()=>{
                handleBooking()
            }} >ĐẶT VÉ</button>

        </section>
    )
}

export default BoxBooking
