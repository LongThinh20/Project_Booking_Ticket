import React, { Component } from 'react';
import '../../Layouts/Carousel.scss';

export default class Carousel extends Component {
    render() {
        return (
            <div>
                <section className="movieCarousel" >
                    <div id="movieSlider" className="carousel slide carousel-fade" data-ride="carousel">
                        <ol className="container carousel-indicators">
                            <li data-target="#movieSlider" data-slide-to={0} className="active" />
                            <li data-target="#movieSlider" data-slide-to={1} />
                            <li data-target="#movieSlider" data-slide-to={2} />
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active img-1">
                                <div className="carousel-item__overlay" />
                            </div>
                            <div className="carousel-item img-2">
                                <div className="carousel-item__overlay" />
                            </div>
                            <div className="carousel-item img-3">
                                <div className="carousel-item__overlay" />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#movieSlider" data-slide="prev">
                            <span className="carousel-control-prev-icon" />
                        </a>
                        <a className="carousel-control-next" href="#movieSlider" data-slide="next">
                            <span className="carousel-control-next-icon" />
                        </a>
                    </div>
                </section>
            </div>

        )
    }
}
