
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
                    title: 'C???p nh???t phim th??nh c??ng !!!',
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
                    <h3>S???A TH??NG TIN PHIM </h3>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="maPhim">M?? phim</label>
                    <input
                        type="number"
                        name="maPhim"
                        placeholder="Nh???p m?? phim"
                        ref={register({
                            required: "M?? phim kh??ng ???????c r???ng !!",

                            minLength: { value: 4, message: "M?? phim ph???i t??? 4 ch??? s???!!" }
                        }
                        )}
                        className={`form-control ${errors.maPhim ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.maPhim}
                    />
                    <p className="invalid-feedback" name="maPhim">{errors.maPhim?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="taiKhoan">T??n phim</label>
                    <input
                        type="text"
                        name="tenPhim"
                        placeholder="Nh???p t??n phim "
                        ref={register({
                            required: "T??n phim kh??ng ???????c r???ng !!"
                        })}
                        className={`form-control ${errors.tenPhim ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.tenPhim}

                    />
                    <p className="invalid-feedback" name="tenPhim">{errors.tenPhim?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="biDanh">B?? danh </label>
                    <input
                        name="biDanh"
                        type="text"
                        placeholder="Nh???p b?? danh"
                        ref={register({
                            required: "B?? danh kh??ng ???????c r???ng !!"
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
                        placeholder="Nh???p trailer"
                        ref={register({
                            required: "Trailer kh??ng ???????c r???ng !!",
                        })}
                        className={`form-control ${errors.trailer ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.trailer}


                    />
                    <p className="invalid-feedback" name="trailer">{errors.trailer?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="hinhAnh">H??nh ???nh </label>
                    <input
                        name="hinhAnh"
                        type="file"
                        placeholder="Ch???n h??nh ???nh "
                        ref={register({
                            required: "H??nh ???nh kh??ng ???????c r???ng !!",
                        })}
                        className={`form-control ${errors.hinhAnh ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.hinhAnh}

                    />
                    <p className="invalid-feedback" name="hinhAnh">{errors.hinhAnh?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="hinhAnh">M?? t???  </label>
                    <textarea
                        name="moTa"
                        type="text"
                        // placeholder="Nh???p s??? ??i???n tho???i"
                        ref={register({
                            required: "M?? t??? kh??ng ???????c r???ng !!",
                        })}
                        className={`form-control ${errors.moTa ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.moTa}

                    />
                    <p className="invalid-feedback" name="moTa">{errors.moTa?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="hinhAnh" className="mr-2">Ng??y kh???i chi???u </label>

                    <DatePicker
                        showTimeSelect
                        placeholderText="Ng??y kh???i chi???u "
                        minDate={new Date()}
                        dateFormat="dd.MM.yyyy - HH:MM "
                        onChange={date => setStartDate(date)}
                        name='ngayKhoiChieu'
                        placeholderText="Ng??y kh???i chi???u "
                        selected={startDate}
                        className={`form-control ${errors.ngayKhoiChieu ? "is-invalid" : ""}`}
                        ref={register({
                            required: "Ng??y kh???i chi???u kh??ng ???????c r???ng !!",
                        })}
                    />





                    <p className="invalid-feedback" name="ngayKhoiChieu">{errors.ngayKhoiChieu?.message}</p>

                </div>
                <div className="form-group">
                    <label htmlFor="danhGia">????nh gi?? </label>
                    <input
                        name="danhGia"
                        type="number"
                        placeholder="Nh???p ????nh gi?? "
                        ref={register({
                            required: "????nh gi?? kh??ng ???????c r???ng !!"
                        })}
                        className={`form-control ${errors.danhGia ? "is-invalid" : ""}`}
                        onChange={event => handleChange(event)}
                        defaultValue={props.objEdit.danhGia}

                    />
                    <p className="invalid-feedback" name="danhGia">{errors.danhGia?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="maNhom">M?? nh??m</label>
                    <select
                        name="maNhom"
                        className={`form-control ${errors.maNhom ? "is-invalid" : ""}`}
                        ref={register({
                            required: "M?? kh??ng ???????c r???ng !!"
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
                    <button type="submit" className="btn button_Form" >HO??N T???T</button>
                </div>

            </form>
        </div>
    );
}

