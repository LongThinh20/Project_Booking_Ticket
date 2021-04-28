import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { userService } from '../../../Service';
import { signupUserSchema } from '../../../Service/user';
import '../../../Layouts/signUp.scss';
import '../../../Sass/Components/button_Form.scss';
import Swal from "sweetalert2";



class SignUp extends Component {
    _handleSubmit = values => {
        console.log(values);
        userService.signUp(values)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng kí thành công!!',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result) {
                        window.location.replace("/signIn")
                    }
                }
                )
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data,
                    text: 'Đăng kí không thành công!!',
                })
            })
    }
    render() {
        return (
            <section className="signUp">
                <div className="signUp_content">
                    <h1>ĐĂNG KÍ</h1>
                    <Formik
                        initialValues={{
                            taiKhoan: "",
                            matKhau: "",
                            hoTen: "",
                            email: "",
                            soDt: "",
                            maNhom: "GP03",
                            maLoaiNguoiDung: "KhachHang",
                        }}
                        validationSchema={signupUserSchema}
                        onSubmit={this._handleSubmit
                        }
                        render={(formikProps) => (
                            <Form>
                                <div className="form-group">
                                    <label>Họ tên: </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        placeholder="Họ và tên"
                                        name="hoTen"
                                        onChange={formikProps.handleChange}
                                    />
                                    <ErrorMessage name="hoTen">
                                        {msg => <div className="alert alert-danger mt-2">{msg}</div>}
                                    </ErrorMessage>

                                </div>
                                <div className="form-group">
                                    <label>Tài khoản: </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        placeholder="Tài khoản"
                                        name="taiKhoan"
                                        onChange={formikProps.handleChange}
                                    />
                                    <ErrorMessage name="taiKhoan">
                                        {msg => <div className="alert alert-danger mt-2">{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu: </label>
                                    <Field
                                        type="password"
                                        className="form-control"
                                        placeholder="Mật khẩu"
                                        name="matKhau"
                                        onChange={formikProps.handleChange}
                                    />
                                    <ErrorMessage name="matKhau">
                                        {msg => <div className="alert alert-danger mt-2">{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <Field
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        onChange={formikProps.handleChange}
                                    />
                                    <ErrorMessage name="email">
                                        {msg => <div className="alert alert-danger mt-2">{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        placeholder="Số điện thoại"
                                        name="soDt"
                                        onChange={formikProps.handleChange}
                                    />
                                    <ErrorMessage name="soDt">

                                    </ErrorMessage>
                                </div>
                                <div className="form-group">
                                    <label>Mã nhóm: </label>
                                    <Field
                                        component="select"
                                        className="form-control"
                                        placeholder="Chọn mã nhóm"
                                        name="maNhom"
                                        onChange={formikProps.handleChange}>
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
                                    </Field>
                                    <ErrorMessage name="maNhom">
                                        {msg => <div className="alert alert-danger">{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn button_Form" >ĐĂNG KÍ</button>
                                </div>
                            </Form>
                        )} ></Formik>
                </div>
            </section>


        )
    }
}

export default SignUp;