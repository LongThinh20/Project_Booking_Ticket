import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { login } from '../../../Redux/Actions/user';
import '../../../Layouts/signIn.scss';
import '../../../Sass/Components/button_Form.scss';




export default function SignIn() {

    const [user, setuser] = useState({
        taiKhoan: '',
        matKhau: ''
    });

    const dispatch = useDispatch();

    let handleChange = (e) => {
        let { value, name } = e.target;
        setuser({
            ...user,
            [name]: value
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(user))
    }

    return (
        <section className="signIn">
            <div className="signIn_Content mt-4 mb-4 ">
                <h1>ĐĂNG NHẬP</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label label > Tài khoản: </label>
                        <input
                            type="text"
                            name="taiKhoan"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div >
                    <div className="form-group">
                        <label>Mật khẩu: </label>
                        <input
                            type="password"
                            name="matKhau"
                            onChange={handleChange}
                            className="form-control" />
                    </div>
                    <button className="btn button_Form">Đăng nhập</button>
                </form >


            </div>
        </section>
    )
}
