import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
import { movieService } from "../../../../Service";
import img1 from '../../../../img/AGRIBANK.png';
import img2 from '../../../../img/VCB.png';
import img3 from '../../../../img/VIETTINBANK.png';
import img4 from '../../../../img/STARLIGHT.png';
import img5 from '../../../../img/IVB.png';
import img6 from '../../../../img/payoo.jpg';
import img7 from '../../../../img/zalopay_icon.png';
import '../../../../Layouts/bookingStyle.scss';


export default function PayList(props) {
  let lstSeatBooking = useSelector((state) => state.movie.lstSeatBooking);
  let [lstBookingTicket, setlstBookingTicket] = useState({});
  const user = useSelector((state) => state.user.credentials);
  const objBooking = useSelector(state => state.movie.objBooking)


  let check = false;
  if (lstSeatBooking.length >= 1) {
    check = true;
  } else {
  }

  useEffect(() => {
    movieService
      .fetchBookingTicket(props.param)
      .then((res) => {
        setlstBookingTicket(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [JSON.stringify(lstBookingTicket)]);


  const checkPay = (maLichChieu) => {
    if (check) {
      Swal.fire({
        title: "Bạn có chắc muốn thanh toán không",
        icon: "info",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "THANH TOÁN",
      }).then((result) => {
        datVe(maLichChieu)
      })


    } else {
      Swal.fire({
        icon: 'info',
        title: 'Chưa có ghế nào được chọn ??'
      })
    }
  };

  const datVe = (maLichChieu) => {
    let taiKhoan = JSON.parse(localStorage.getItem("credentials")).taiKhoan;
    let accessToken = JSON.parse(localStorage.getItem("credentials")).accessToken;


    let lstBooking = {
      'maLichChieu': maLichChieu,
      'danhSachVe': objBooking,
      'taiKhoanNguoiDung': taiKhoan
    }


    movieService.booking(lstBooking, accessToken)
      .then(res => {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: res.data,
          showConfirmButton: false,
          timer: 1500
        }).then(
          window.location.replace("/")
        )

      })
      .catch(err => {
        console.log(err.reponse.data);
      })



  };

  return (
    <div className=" contentRight ">
      <div className="card ">
        <div className="card-header totalCost">
          {
            check ? (lstSeatBooking.reduce((total, lst) => { return (total += lst.price); }, 0).toLocaleString() + ' đ') : "0 đ"
          }

        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className=" pl-0">
              <p className="text_Form_Title">
                {Object.entries(lstBookingTicket).map(([index, item]) => {
                  return item.tenPhim;
                })}
              </p>
              <div className="text_Normal">
                {Object.entries(lstBookingTicket).map(([index, item]) => {
                  return item.tenCumRap;
                })}
              </div>
              <div className="text_Normal">
                {Object.entries(lstBookingTicket)
                  .slice(0, 1)
                  .map(([index, item]) => {
                    return (
                      <span className="text_Normal" key={index}>
                        {moment(item.ngayChieuGioChieu).format("DD.MM")} ~{" "}
                        <span className="text_Orange">
                          {moment(item.ngayChieuGioChieu).format("hh:mm a")}
                        </span>
                      </span>
                    );
                  })}{" "}
                -
                <span className="pl-2 text_Normal">
                  {Object.entries(lstBookingTicket).map(([index, item]) => {
                    return item.tenRap;
                  })}
                </span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="text_Form_Title">
              Ghế:
              {lstSeatBooking?.map((item, index) => {
              return (
                <span key={index} className="text_Orange pr-2 ml-2">
                  {item.rowSeat}
                  {`${item.stt}`} -{" "}
                  <span className="text_Green">
                    {item.price.toLocaleString()}
                  </span>
                </span>
              );
            })}
            </div>
          </li>
          <li className="list-group-item">
            <div className="text_Normal">Email</div>
            <div className="text_Form_Title">{user.email}</div>
          </li>

          <li className="list-group-item">
            <div className="text_Normal">Số điện thoại</div>
            <div className="text_Form_Title">{user.soDT}</div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col discountInput">
                <div className="form-group">
                  <label htmlFor="usr" className="text_Normal">
                    Mã giảm giá
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="usr"
                    placeholder="Nhập mã tại đây ... "
                  />
                </div>
              </div>

              <div className="col-4">
                <button className="btn btn-success" >Áp dụng</button>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="text_Form_Title">Hình thức thanh toán</div>
            <div className="payMents">
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="optradio"
                  />
                  <img src={img7} style={{ height: '30px', width: '40px' }} className="ml-4" alt=""></img> Thành toán qua ZaloPay
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label ">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="optradio"
                  />
                  <i className="fa fa-cc-visa mr-2 ml-4" style={{ fontSize: '32px', color: 'orange' }} />Visa, Master, JCB
                </label>
              </div>
              <div className="form-check ">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="optradio"
                    data-toggle="collapse"
                    data-target="#boxnoidung"
                  />
                  <i className="fa fa-credit-card mr-2 ml-4" style={{ fontSize: '35px', color: 'orange' }} ></i>Thẻ ATM nội địa <i className="fa fa-angle-down"></i>
                </label>
                <div className="collapse mt-4 ATM_content" id="boxnoidung">
                  <button>
                    <img src={img1} style={{ width: '60px', height: '50px' }} alt=""></img>
                  </button>
                  <button>
                    <img src={img2} style={{ width: '60px', height: '50px' }} alt=""></img>
                  </button>
                  <button>
                    <img src={img3} style={{ width: '60px', height: '50px' }} alt=""></img>
                  </button>
                  <button>
                    <img src={img4} style={{ width: '60px', height: '50px' }} alt=""></img>
                  </button>
                  <button>
                    <img src={img5} style={{ width: '60px', height: '50px' }} alt=""></img>
                  </button>
                </div>
              </div>
              <div className="form-check ">
                <label className="form-check-label ">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="optradio"
                  />
                  <span><img src={img6} style={{ width: '40px', height: '30px' }} className="ml-4" alt=""></img></span> Thanh toán tại của hàng tiện ích
                </label>
              </div>
            </div>
          </li>
        </ul>
        <div></div>
        <div className="card-foot">
          {Object.entries(lstBookingTicket).slice(0, 1).map(([index, item]) => {
            // console.log(item.tenPhim)
            return (<button onClick={() => { checkPay( item.maLichChieu) }} className="button_Form bookingEdit" > Đặt Vé </button>)
          })}

        </div>
      </div>
    </div >
  );
}
