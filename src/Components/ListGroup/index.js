import React, { useState, useEffect } from "react";
import "../../Layouts/bookingTicket.scss";
import "../../Sass/Components/button_ShowTime.scss";
import "../../Sass/Components/text_Green.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { movieService } from "../../Service";
import moment from "moment";

export default function ListGroup(props) {
  let [cinemaList, setcinemaList] = useState({});
  let [showtimeCinema, setshowtimeCinema] = useState({});
  const maHeThongRap = useSelector((state) => state.movie.maHeThongRap);
  const maCumRap = useSelector((state) => state.movie.maCumRap);
  const lstMovie = useSelector((state) => state.movie.lstMovie);

  useEffect(() => {
    movieService
      .fetchCinema()
      .then((res) => {
        let danhSachPhim = res.data;
        setcinemaList(danhSachPhim);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    movieService
      .fetchShowtimeToCinemaGroup(maHeThongRap)
      .then((res) => {
        let lichchieu = res.data;

        setshowtimeCinema(lichchieu);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [maHeThongRap]);

  const dispatch = useDispatch();

  const onIncrement = (cinema) => {
    dispatch({ type: "CHANGE_ID", payload: cinema });
  };

  const checkShowTime = (lstMovie) => {
    dispatch({ type: "LST_MOVIE", payload: lstMovie });
  };

  const credentials = useSelector((state) => state.user.credentials);

  return (
    <section className="bookingTicket" id="booking">
      <div className="container">
        <div className="row">
          <div className=" col-md-12 col-lg-2 cinemaList">
            <h4 className="cinemaTitle">CHỌN RẠP</h4>
            <div
              className="cinemaList_content list-group"
              id="list-tab"
              role="tablist"
            >
              {Object.entries(cinemaList).map(([index, item]) => {
                return maHeThongRap === item.maHeThongRap ? (
                  <a
                    className="cinemaList_item list-group-item list-group-item-action active"
                    id="list-home-list"
                    data-toggle="list"
                    href={`#${item.maHeThongRap}`}
                    role="tab"
                    aria-controls={item.maHeThongRap}
                    onClick={() => onIncrement(item.maHeThongRap)}
                    key={index}
                  >
                    <img
                      className="Cinema_Icon"
                      src={item.logo}
                      style={{ width: "50px", height: "50px" }}
                      alt=""
                    />
                  </a>
                ) : (
                  <a
                    className="cinemaList_item list-group-item list-group-item-action"
                    id="list-home-list"
                    data-toggle="list"
                    href={`#${item.maHeThongRap}`}
                    role="tab"
                    aria-controls="home"
                    onClick={() => onIncrement(item.maHeThongRap)}
                    key={index}
                  >
                    <img
                      className="Cinema_Icon"
                      src={item.logo}
                      style={{ width: "50px", height: "50px" }}
                      alt=""
                    />
                  </a>
                );
              })}
            </div>
          </div>

          <div className=" col-md-12 col-lg-4 cinemaGroupList">
            <h4 className="cinemaTitle">CHỌN CỤM RẠP</h4>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id={maHeThongRap}
                role="tabpanel"
                aria-labelledby={maHeThongRap}
              >
                <div
                  className="cinemaGroupList_content list-group"
                  id="list-tab"
                  role="tablist"
                >
                  {maHeThongRap !== null ? (
                    Object.entries(showtimeCinema).map(([index, item]) => {
                      return Object.entries(item.lstCumRap).map(
                        ([index, item]) => {
                          return (
                            <a
                              className="cinemaGroupList_item list-group-item list-group-item-action "
                              id={item.maHeThongRap}
                              data-toggle="list"
                              href={`#${item.maCumRap}`}
                              role="tab"
                              aria-controls="home"
                              key={index}
                              onClick={() => {
                                checkShowTime(item.danhSachPhim);
                              }}
                            >
                              <p className="text-dark">
                                Tên rạp:{" "}
                                <span className="text-info">
                                  {item.tenCumRap}
                                </span>
                              </p>
                              <p className="text-dark">
                                Địa chỉ :{" "}
                                <span className="text-info">{item.diaChi}</span>
                              </p>
                            </a>
                          );
                        }
                      );
                    })
                  ) : (
                    <p className="text-center mt-4">Vui lòng chọn rạp</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className=" col-md-12 col-lg cinemaMovie">
            <h4 className="cinemaTitle">CHỌN SUẤT</h4>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="cinemaMovie_content tab-pane fade show active"
                id={maCumRap}
                role="tabpanel"
                aria-labelledby={maHeThongRap}
              >
                {maHeThongRap !== null ? (
                  Object.entries(lstMovie).map(([index, item]) => {
                    return (
                      <div className="cinemaMovie_item row">
                        <div className="col-2  cinemaMovie_img">
                          <img
                            src={item.hinhAnh}
                            className="img-fluid ml-2"
                            alt=""
                          />
                        </div>
                        <div className="col cinemaMovie_detail">
                          <h3>{item.tenPhim}</h3>
                          <p className="mr-lg-2">
                            <i className="fa fa-clock" /> THỜI GIAN :{" "}
                            <span>120 phút</span>
                          </p>

                          {Object.entries(item.lstLichChieuTheoPhim)
                            .slice(0, 10)
                            .map(([index, item]) => {
                              return credentials ? (
                                <NavLink
                                  to={`/booking/${item.maLichChieu}`}
                                  className="button_ShowTime mb-2"
                                >
                                  {" "}
                                  <span
                                    className="text_Green"
                                    style={{ fontSize: "13px" }}
                                  >
                                    {moment(item.ngayChieuGioChieu).format(
                                      "DD.MM"
                                    )}
                                    ~
                                  </span>{" "}
                                  {moment(item.ngayChieuGioChieu).format(
                                    "hh:mm a"
                                  )}
                                </NavLink>
                              ) : (
                                <NavLink
                                  to={`/signIn`}
                                  className="button_ShowTime mb-2"
                                >
                                  <span
                                    className="text_Green"
                                    style={{ fontSize: "13px" }}
                                  >
                                    {moment(item.ngayChieuGioChieu).format(
                                      "DD.MM"
                                    )}
                                    ~
                                  </span>{" "}
                                  {moment(item.ngayChieuGioChieu).format(
                                    "hh:mm a"
                                  )}
                                </NavLink>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center mt-4">Vui lòng chọn cụm rạp</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
