import React, { Component } from 'react';
import '../../Layouts/footer.scss';

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="background" />
                    <div className=" footer__content text-sm-center">
                        <div className="row">
                            <div className="footer__items col-12 col-md">
                                <h6>GIỚI THIỆU</h6>
                                <ul>
                                    <li><a href="#/">VỀ CHÚNG TÔI</a></li>
                                    <li><a href="#/">GÓP Ý</a></li>
                                    <li><a href="#/">THÔNG TIN LIÊN HỆ</a></li>
                                </ul>
                            </div>
                            <div className="footer__items col-12 col-md ">
                                <h6>GÓC ĐIỆN ẢNH </h6>
                                <ul>
                                    <li><a href="#/">Thể loại phim</a></li>
                                    <li><a href="#/">Bình luận phim</a></li>
                                    <li><a href="#/">Phim hay tháng</a></li>
                                </ul>
                            </div>
                            <div className="footer__items col-12 col-md">
                                <h6>HỖ TRỢ</h6>
                                <ul>
                                    <li><a href="#/">Góp ý</a></li>
                                    <li><a href="#/">Rạp / Giá vé</a></li>
                                    <li><a href="#/">Tuyển dụng</a></li>
                                </ul>
                            </div>
                            <div className="footer__items col-12 col-md">
                                <h6>KẾT NỐI VỚI CHÚNG TÔI</h6>
                                <a href="#/">
                                    <i className="fa fa-facebook-square" style={{ fontSize: '30px' }} />
                                </a>

                                <a href="#/">
                                    <i className="fa fa-twitter" style={{ fontSize: '30px' }} />
                                </a>

                                <a href="#/">
                                    <i className="fa fa-google" style={{ fontSize: '30px' }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        )
    }
}
