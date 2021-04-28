import React, { useEffect, useState } from 'react';
import { Table, Image } from 'antd';
import { movieService } from '../../../Service';
import '../../../Sass/Components/button_Form.scss';
import { useSelector } from 'react-redux';
import ModalFormAddMovie from './ModalFormAddMovie';
import ModalFormEditMovie from './ModalFormEditMovie';
import Swal from 'sweetalert2';
import '../../../Layouts/userManager.scss'
import moment from "moment";




export default function MovieManager() {

    const [movie, setmovie] = useState({});
    const [objEdit, setobjEdit] = useState({});
    const accessToken = useSelector(state => state.user.credentials.accessToken)

    useEffect(() => {
        movieService.fetchMovie()
            .then(res => {
                let lstMovie = res.data;
                setmovie(lstMovie);
            })
            .catch(err => {
                console.log(err.reponse.data);
            })
    }, [])

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Bạn có chắc muốn xóa không ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa'
        }).then((result) => {
            if (result.isConfirmed) {
                movieService.deleteMovie(id, accessToken)
                    .then(res => {

                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Xóa phim thành công !!!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    })

                    .catch(err => {
                        console.log(err.response.data);
                    })


            }
        })

    }


    const handleEdit = (e) => {
        let obj = {
            'maPhim': e.maPhim,
            'tenPhim': e.tenPhim,
            'biDanh': e.biDanh,
            'trailer': e.trailer,
            'hinhAnh': e.hinhAnh,
            'moTa': e.moTa,
            'ngayKhoiChieu': e.ngayKhoiChieu,
            'danhGia': e.danhGia,
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
            title: 'Mã phim',
            width: 50,
            dataIndex: 'maPhim',
            key: '1',
            fixed: 'left',
        },
        {
            title: 'Tên phim',
            width: 80,
            dataIndex: 'tenPhim',
            key: '2',
            fixed: 'left',
        },
        {
            title: 'Bí danh ',
            dataIndex: 'biDanh',
            key: '3',
            width: 80,
        },
        {
            title: 'Trailer',
            dataIndex: 'trailer',
            key: '4',
            fixed: 'center',
            width: 100
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            key: '5',
            width: 150,
            fixed: 'center',
            render: (_, record) => <Image src={record.hinhAnh} width={200} />
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: '6',
            width: 150,
        },
        {
            title: 'Mã Nhóm ',
            dataIndex: 'maNhom',
            key: '7',
            width: 50,
        },
        {
            title: 'Ngày khởi chiếu ',
            dataIndex: 'ngayKhoiChieu',
            key: '8',
            width: 100,
            render: (_, record) => <div>{moment(record.ngayKhoiChieu).format('DD.MM.YYYY HH:MM A')}</div>
        },
        {
            title: 'Đánh giá',
            dataIndex: 'danhGia',
            key: '9',
            width: 50,
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
                        onClick={() => { handleDelete(record.maPhim) }}>XÓA</button>
                    <button
                        className="btn btn-warning"
                        data-toggle="modal" data-target="#modalEditMovie"
                        onClick={() => { handleEdit(record) }}
                    >SỬA</button>
                </div>
            ,
        },
    ];


    const data = [];

    Object.entries(movie).map(([index, item]) => {
        return (data.push({
            key: index.toString(),
            stt: (Number(index) + 1),
            maPhim: item.maPhim,
            tenPhim: item.tenPhim,
            biDanh: item.biDanh,
            trailer: item.trailer,
            hinhAnh: item.hinhAnh,
            moTa: item.moTa,
            ngayKhoiChieu: item.ngayKhoiChieu,
            maNhom: item.maNhom,
            danhGia: item.danhGia


        })
        )
    })


    return (
        <section className="userManager">
            <div className="container-fluid">

                <div className="row mt-4">
                    <div className="col"><h1>Danh sách phim </h1></div>
                    <div className="col-3 text-right">
                        <button type="button" className="btn  button_Form" data-toggle="modal" data-target="#modalAddMovie">THÊM PHIM</button>
                    </div>

                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1500, y: 600 }}

                />

                <div>

                    <div className="modal fade" id="modalAddMovie" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <ModalFormAddMovie />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <div className="modal fade" id="modalEditMovie" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <ModalFormEditMovie objEdit={objEdit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>





        </section>
    )

}
