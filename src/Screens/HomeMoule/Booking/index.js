import '../../../Layouts/bookingStyle.scss';
import '../../../Sass/Components/demo.scss';
import '../../../Sass/Components/seatSelect.scss';
import '../../../Sass/Components/seat.scss';
import '../../../Sass/Components/seatVip.scss';
import '../../../Sass/Components/seatBooking.scss';
import '../../../Sass/Components/button_Form.scss';
import '../../../Sass/Components/text_Form_Title.scss';
import '../../../Sass/Components/text_Green.scss';
import '../../../Sass/Components/text_Orange.scss';
import '../../../Sass/Components/text_Normal.scss';
import '../../../Sass/Components/demoText.scss';
import '../../../Sass/Components/rowSeat.scss';

import Countdown from 'react-countdown-now';
import swal from 'sweetalert';

import React, { useEffect, useState } from 'react'
import { movieService } from '../../../Service';
import SeatList from './SeatList';
import PayList from './PayList';
import { useParams } from 'react-router-dom';

export default function Booking(props) {

  let params = useParams();

  let [lstBookingTicket, setlstBookingTicket] = useState({});

  useEffect(() => {
    movieService.fetchBookingTicket(params.Id)
      .then(res => {
        setlstBookingTicket(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [JSON.stringify(lstBookingTicket)])

  const Completionist = () => (
    swal("Hết thời gian đặt ghế vui lòng đặt ghế trong thời gian 5 phút,tiến hành đặt lại!!")
      .then((value) => {
        window.location.reload()
      })
  )
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (<h4 style={{ color: 'orange' }}>{minutes}:{seconds}</h4>);
    }
  };
  const couter = 1000 * 60 * 5
  return (
    <section className="seatList">

      <div className="container">
        <div className="row  _countDown">
          <div className="col-6">
            <p className="demoText">
              {
                Object.entries(lstBookingTicket).map(([index, item]) => {
                  return (
                    item.tenCumRap
                  )
                })
              }
            </p>
          </div>
          <div className="col-6 text-right text-lg-right text-xl-left">
            <div className="text_Normal">Thời gian giữ ghế:</div>
            <Countdown
              date={Date.now() + couter}
              renderer={renderer}
            />
          </div>
        </div>

        <div className="row">

          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 seatList_detail">
            <div className="row">
              <div className="custom col-12">
                <SeatList param={params.Id} />
              </div>
              <div className="contentBottom col-12">
                <div className="row ">
                  <div className="col" >
                    <div className="seat" />
                    <div className="label">Ghế chưa chọn</div>
                  </div>
                  <div className="col" >
                    <div className="seatVip" />
                    <div className="label">Ghế VIP</div>
                  </div>
                  <div className="col" >
                    <div className="seatSelect" />
                    <div className="label">Ghế đã có người chọn</div>
                  </div>
                  <div className="col" >
                    <div className="seatBooking" />
                    <div className="label">Ghế đang chọn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl payList_detail" >
            <PayList param={params.Id} />
          </div>
        </div>
      </div>
    </section >


  )
}

