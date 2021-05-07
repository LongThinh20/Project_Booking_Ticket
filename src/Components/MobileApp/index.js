import React from "react";
import Slider from "react-slick";
import img1 from "../../img/mobile_screen_1.jpg";
import img2 from "../../img/mobile_screen_2.jpg";
import img3 from "../../img/mobile_screen_3.jpg";
import img4 from "../../img/mobile_screen_4.jpg";
import img5 from "../../img/mobile_screen_5.jpg";
import "../../Layouts/mobileApp.scss";
import SampleNextArrow from "./Arrow/nextArrow";
import SamplePrevArrow from "./Arrow/prevArrow";

export default function MobileApp() {
  const setting = {
    dots: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <section className="mobileApp">
      <div className="container">
        <div className="row content">
          <div className="col-12 col-lg-8 content_left">
            <h1>
              Ứng dụng dành cho <br /> người yêu điện ảnh{" "}
            </h1>
            <p>
              Không chỉ đặt vé, bạn còn có thể bình luận phim, <br></br> chấm
              điểm rạp và đổi quà hấp dẫn
            </p>
            <button className="btn btn-danger">App miễn phí - Tải ngay</button>
            <p>Có hai phiên bản iOS & Android</p>
          </div>
          <div className="col-12 col-lg-4 content_right">
            <Slider {...setting}>
              <>
                <div className="out_line">
                  <img src={img1} alt=""></img>
                </div>
              </>
              <>
                <div className="out_line">
                  <img src={img2} alt=""></img>
                </div>
              </>
              <>
                <div className="out_line">
                  <img src={img3} alt=""></img>
                </div>
              </>
              <>
                <div className="out_line">
                  <img src={img4} alt=""></img>
                </div>
              </>
              <>
                <div className="out_line">
                  <img src={img5} alt=""></img>
                </div>
              </>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
