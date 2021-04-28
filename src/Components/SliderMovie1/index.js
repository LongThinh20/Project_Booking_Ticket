import React, { useEffect, useState } from 'react'
import SampleNextArrow from './Arrow/nextArrow';
import SamplePrevArrow from './Arrow/prevArrow';
import SliderItemsOnShow from './SliderItemsOnShow';
import SilderItemsComingSoon from './SilderItemsComingSoon'
import '../../Layouts/Slider.scss';
import Slider from 'react-slick';
import { movieService } from '../../Service';

export default function SliderMovie1(props) {
    const settings = {
        className: "center",
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 3,
        rows: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    rows: 3,

                }
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 4,

                }
            }
        ]
    }

    let [movieList, setmovieList] = useState({});

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

    return (
        <section className="mySlider " id="showlstMovie">
            <div className="container">

                <ul className="nav nav-pills">
                    <li className="nav-item ">
                        <a className="nav-link active" data-toggle="pill" href="#home">
                            <h3 className="__title">ĐANG CHIẾU </h3>
                        </a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link" data-toggle="pill" href="#menu1">
                            <h3 className="__title">SẮP CHIẾU </h3>
                        </a>
                    </li>
                </ul>

            </div>

            <div className="tab-content">
                <div className="tab-pane container active pb-4" id="home">
                    <Slider {...settings}>
                        {
                            Object.entries(movieList).map(([index, item]) =>
                                (
                                    <SliderItemsOnShow item={item} key={index} />
                                )
                            )
                        }
                    </Slider>
                </div>
                <div className="tab-pane container fade" id="menu1">
                    <Slider {...settings}>
                        {
                            Object.entries(movieList).map(([index, item]) =>
                                (
                                    <SilderItemsComingSoon item={item} key={index} />
                                )

                            )
                        }
                    </Slider>
                </div>

            </div>

        </section>
    )
}
