import React from 'react';
import Countdown from 'react-countdown-now';
import swal from 'sweetalert';

export default function countDownComponent() {

  const Completionist = () => (
    swal("Hết thời gian đặt ghế vui lòng đặt ghế trong thời gian 5 phút,tiến hành đặt lại!!")
      .then((value) => {
        window.location.reload()
      })
  )

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      console.log(completed);
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className="display-4">{minutes}:{seconds}</span>);
    }
  };
  const couter = 1000 * 60 * 5

  return (
    <div className="container">
      <div>Thời gian giữ ghế:</div>
      <Countdown
        date={Date.now() + couter}
        renderer={renderer}
      />
    </div >

  )
}
