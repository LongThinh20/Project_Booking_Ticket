import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { userService } from '../../../Service';
import '../../../Sass/Components/button_Form.scss';
import { useSelector } from 'react-redux';
import ModalFormAddUser from './ModalFormAddUser';
import ModalFormEditUser from './ModalFormEditUser';

import '../../../Layouts/userManager.scss'
import swal from 'sweetalert';
import Swal from 'sweetalert2'


export default function UserManager() {

    const [DeleteAccount, setDeleteAccount] = useState({});
    const [user, setuser] = useState({});
    const [objEdit, setobjEdit] = useState({});

    const credentials = useSelector(state => state.user.credentials)

    useEffect(() => {
        userService.getInfo()
            .then(res => {
                let lstUser = res.data;
                setuser(lstUser);
            })
            .catch(err => {
                console.log(err.reponse.data);
            })
    }, [])

    const handleDelete = (acc, pass) => {
        let account = {
            taiKhoan: acc,
            matKhau: pass
        }

        userService.signIn(account)
            .then(res => {
                Swal.fire({
                    title: 'Bạn có muốn xóa không ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xóa'
                }).then((result) => {
                    if (result) {


                        setDeleteAccount(res.data)
                        userService.dedeteUser(DeleteAccount.taiKhoan, credentials.accessToken)
                            .then(res => {
                                swal({
                                    title: res.data,
                                    icon: "success",
                                    button: "OK",
                                })
                                    .then((result) => {
                                        if (result) {
                                            window.location.reload()
                                        }
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                            })

                    }

                })

            }

            )
            .catch(err => {
                console.log(err.reponse.data);
            })
    }


    const handleSearch = (e) => {
        userService.searchUser(e)
            .then(res => {
                let lstUserUpdate = res.data;

                setuser(lstUserUpdate)
            })
            .catch(err => {
                console.log(err.reponse.data);
            })
    }

    const handleEdit = (e) => {
        let obj = {
            'taiKhoan': e.taiKhoan,
            'hoTen': e.hoTen,
            'matKhau': e.matKhau,
            'email': e.email,
            'soDT': e.soDT,
            'maLoaiNguoiDung': e.maLoaiNguoiDung,
            'maNhom': 'GP03'
        }
        setobjEdit(obj)
    }

    const columns = [
        {
            title: 'STT',
            width: 40,
            dataIndex: 'stt',
            key: '1',
            fixed: 'left',
        },
        {
            title: 'Tài khoản',
            width: 90,
            dataIndex: 'taiKhoan',
            key: '1',
            fixed: 'left',
        },
        {
            title: 'Họ tên',
            width: 90,
            dataIndex: 'hoTen',
            key: '2',
            fixed: 'left',
        },
        {
            title: 'Mật khẩu ',
            dataIndex: 'matKhau',
            key: '3',
            width: 80,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: '4',
            width: 100,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDT',
            key: '5',
            width: 70,
        },
        {
            title: 'Mã loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            key: '6',
            width: 80,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'center',
            width: 100,
            render: (_, record) =>
                <div>
                    <button
                        className="btn btn-danger mr-2"
                        onClick={() => { handleDelete(record.taiKhoan, record.matKhau) }}>XÓA</button>
                    <button
                        className="btn btn-warning"
                        data-toggle="modal" data-target="#modalEditUser"
                        onClick={() => { handleEdit(record) }}
                    >SỬA</button>
                </div>
            ,
        },
    ];


    const data = [];

    Object.entries(user).map(([index, item]) => {
        return (data.push({
            key: index.toString(),
            stt: (Number(index) + 1),
            taiKhoan: item.taiKhoan,
            hoTen: item.hoTen,
            matKhau: item.matKhau,
            email: item.email,
            soDT: item.soDt,
            maLoaiNguoiDung: item.maLoaiNguoiDung,

        })
        )
    })



    return (


        <section className="userManager">

            <div className="container-fluid">

                <div className="row mt-4">
                    <div className="col-6"><h1>Danh sách người dùng </h1></div>
                    <div className="col">
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2"
                                type="search"
                                placeholder="Nhập tên người dùng"
                                aria-label="Search"
                                onChange={
                                    (event) => { handleSearch(event.target.value) }
                                }
                            />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Reset</button>
                        </form>
                    </div>
                    <div className="col text-right">
                        <button type="button" className="btn  button_Form" data-toggle="modal" data-target="#modalAddUser">THÊM NGƯỜI DÙNG</button>
                    </div>

                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1500, y: 600 }}

                />

                <div>

                    <div className="modal fade" id="modalAddUser" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <ModalFormAddUser />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <div className="modal fade" id="modalEditUser" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <ModalFormEditUser objEdit={objEdit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </section>
    )

}
