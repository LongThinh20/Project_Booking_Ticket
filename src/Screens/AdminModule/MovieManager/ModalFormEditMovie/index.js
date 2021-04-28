
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import '../../../../Sass/Components/button_Form.scss';
import { useSelector } from "react-redux";
import { movieService } from "../../../../Service";
import Swal from 'sweetalert2';

import DatePicker from "react-datepicker";
import moment from "moment";



export default function ModalForm(props) {

    const { register, errors, handleSubmit } = useForm();
    const [startDate, setStartDate] = useState(new Date())
    const accessToken = useSelector(state => state.user.credentials.accessToken)
    const [objEditMovie, setobjEditMovie] = useState({
        maPhim: '',
        tenPhim: '',
        biDanh: '',
        trailer: '',
        hinhAnh: {},
        moTa: '',
        maNhom: 'GP03',
        ngayKhoiChieu: moment(startDate).format("DD/MM/yyyy"),
        danhGia: ''

    })



    const handleChange = (e) => {
        let { value, name } = e.target

        let target = e.target;
        if (target.name === 'hinhAnh') {
            setobjEditMovie({
                ...objEditMovie,
                [name]: e.target.files[0]
            })

        } else {
            setobjEditMovie({
                ...objEditMovie,
                [name]: value
            })

        }

        console.log(objEditMovie);
    }

    const onSubmit = (values) => {

        let obj = {
            maPhim: values.maPhim,
            tenPhim: values.tenPhim,
            biDanh: values.biDanh,
            trailer: values.trailer,
            hinhAnh: values.hinhAnh[0],
            moTa: values.moTa,
            maNhom: 'GP03',
            ngayKhoiChieu: moment(startDate).format("DD/MM/yyyy"),
            danhGia: values.danhGia
        }

        let form_data = new FormData();

        for (let key in obj) {
            console.log(key, obj[key]);
            form_data.append(key, obj[key])
        }

        movieService.updateMovie(form_data, accessToken)
            .then(res => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Cập nhật phim thành công !!!',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload();
            }).catch(err => {
                console.log(err.response.data);
            })

    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3>SỬA THÔNG TIN PHIM </h3>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="maPhim">Mã phim</label>
                    <input
                        type="number"
                        name="maPhim"
                        placeholder="Nhập mã phim"
                        ref={register({
                            required: "Mã phim không được rỗng !!",

                            minLength: { value: 4, message: "Mã phim phải từ 4 chữ số!!" }
                        }
                        )}
                        className={`form-control ${errors.maPhim ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.maPhim}
                    />
                    <p className="invalid-feedback" name="maPhim">{errors.maPhim?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="taiKhoan">Tên phim</label>
                    <input
                        type="text"
                        name="tenPhim"
                        placeholder="Nhập tên phim "
                        ref={register({
                            required: "Tên phim không được rỗng !!"
                        })}
                        className={`form-control ${errors.tenPhim ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.tenPhim}

                    />
                    <p className="invalid-feedback" name="tenPhim">{errors.tenPhim?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="biDanh">Bí danh </label>
                    <input
                        name="biDanh"
                        type="text"
                        placeholder="Nhập bí danh"
                        ref={register({
                            required: "Bí danh không được rỗng !!"
                        })}
                        className={`form-control ${errors.biDanh ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.biDanh}

                    />
                    <p className="invalid-feedback" name="biDanh">{errors.biDanh?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="trailer">Trailer</label>
                    <input
                        name="trailer"
                        type="text"
                        placeholder="Nhập trailer"
                        ref={register({
                            required: "Trailer không được rỗng !!",
                        })}
                        className={`form-control ${errors.trailer ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.trailer}


                    />
                    <p className="invalid-feedback" name="trailer">{errors.trailer?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="hinhAnh">Hình ảnh </label>
                    <input
                        name="hinhAnh"
                        type="file"
                        placeholder="Chọn hình ảnh "
                        ref={register({
                            required: "Hình ảnh không được rỗng !!",
                        })}
                        className={`form-control ${errors.hinhAnh ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.hinhAnh}

                    />
                    <p className="invalid-feedback" name="hinhAnh">{errors.hinhAnh?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="hinhAnh">Mô tả  </label>
                    <textarea
                        name="moTa"
                        type="text"
                        // placeholder="Nhập số điện thoại"
                        ref={register({
                            required: "Mô tả không được rỗng !!",
                        })}
                        className={`form-control ${errors.moTa ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.moTa}

                    />
                    <p className="invalid-feedback" name="moTa">{errors.moTa?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="hinhAnh" className="mr-2">Ngày khởi chiếu </label>

                    <DatePicker
                        showTimeSelect
                        placeholderText="Ngày khởi chiếu "
                        minDate={new Date()}
                        dateFormat="dd.MM.yyyy - HH:MM "
                        onChange={date => setStartDate(date)}
                        name='ngayKhoiChieu'
                        placeholderText="Ngày khởi chiếu "
                        selected={startDate}
                        className={`form-control ${errors.ngayKhoiChieu ? "is-invalid" : ""}`}
                        ref={register({
                            required: "Ngày khởi chiếu không được rỗng !!",
                        })}
                    />





                    <p className="invalid-feedback" name="ngayKhoiChieu">{errors.ngayKhoiChieu?.message}</p>

                </div>
                <div className="form-group">
                    <label htmlFor="danhGia">Đánh giá </label>
                    <input
                        name="danhGia"
                        type="number"
                        placeholder="Nhập đánh giá "
                        ref={register({
                            required: "Đánh giá không được rỗng !!"
                        })}
                        className={`form-control ${errors.danhGia ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.danhGia}

                    />
                    <p className="invalid-feedback" name="danhGia">{errors.danhGia?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="maNhom">Mã nhóm</label>
                    <select
                        name="maNhom"
                        className={`form-control ${errors.maNhom ? "is-invalid" : ""}`}
                        ref={register({
                            required: "Mã không được rỗng !!"
                        })}
                        defaultValue="GP03"

                    >
                        <option>GP01</option>
                        <option>GP02</option>
                        <option>GP03</option>
                        <option>GP04</option>
                        <option>GP05</option>
                        <option>GP06</option>
                        <option>GP07</option>
                        <option>GP08</option>
                        <option>GP09</option>
                        <option>GP10</option>
                    </select>
                    <p className="invalid-feedback" name="maNhom">{errors.maNhom?.message}</p>
                </div>
                <div>
                    <button type="submit" className="btn button_Form" >HOÀN TẤT</button>
                </div>

            </form>
        </div>
    );
}

