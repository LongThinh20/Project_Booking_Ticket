import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../../Layouts/PersonalInfo.scss';
import { Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import '../../../Sass/Components/text_Orange.scss';
import '../../../Sass/Components/button_Form.scss';
import '../../../Sass/Components/text_Form_Title.scss'
import ModalForm from './ModalForm';
import moment from "moment";
import { userService } from '../../../Service';




export default function PersonalInfo() {

   const credentials = useSelector(state => state.user.credentials);

   const [lstBooking, setlstBooking] = useState({});



   let objTaiKhoan = {
      'taiKhoan': credentials.taiKhoan
   }

   useEffect(() => {
      userService.getPersonal(objTaiKhoan)
         .then(res => {
            setlstBooking(res.data)
         })
         .catch(err => {
            console.log(err);
         })

   }, [credentials.taiKhoan])



   return (
      <section className="PersonalInfo">
         <div className="container">
            <div className="row">
               <div className="col-12 col-lg-4 avatar_Info">
                  <div className="card text-left text-center">
                     <div className="avatar_Info mt-4">
                        <Avatar
                           size={{ xs: 60, sm: 60, md: 80, lg: 80, xl: 80, xxl: 100 }}
                           icon={<AntDesignOutlined />}
                        />
                     </div>
                     <div className="card-body">
                        {
                           credentials !== null ?
                              <h5 className="card-title">Xin chào <span className="text_Orange">{lstBooking.hoTen}</span> !!</h5>
                              : <h5 className="card-title">Xin chào <span className="text_Orange">............</span> !!</h5>

                        }
                        <ul className="nav nav-pills mb-3  flex-column" id="pills-tab" role="tablist">
                           <li className="nav-item">
                              <a className="nav-link active " id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Thông tin cá nhân</a>
                           </li>
                           <li className="nav-item">
                              <a className="nav-link " id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Lịch sử đặt vé</a>
                           </li>
                        </ul>
                     </div>
                  </div>

               </div>
               <div className="col-12 col-lg">
                  <div className="tab-content" id="pills-tabContent">
                     <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="personal_Info">
                           <h3>THÔNG TIN CÁ NHÂN</h3>
                           <table class="table">

                              <tbody>
                                 <tr>
                                    <td className="text_Form_Title left_Info">Tài khoản :</td>
                                    <td className="text-secondary">{credentials === null ? "" : lstBooking.taiKhoan}</td>
                                 </tr>
                                 <tr>
                                    <td className="text_Form_Title left_Info">Số điện thoại : </td>
                                    <td className="text-secondary">{credentials === null ? "" : lstBooking.soDT}</td>
                                 </tr>
                                 <tr>
                                    <td className="text_Form_Title left_Info">Họ và tên :</td>
                                    <td className="text-secondary">{credentials === null ? "" : lstBooking.hoTen}</td>
                                 </tr>
                                 <tr>
                                    <td className="text_Form_Title left_Info">Email : </td>
                                    <td className="text-secondary">{credentials === null ? "" : lstBooking.email}</td>
                                 </tr>
                              </tbody>
                           </table>
                           {
                              credentials === null ? <button type="button" className="btn  button_Form" data-toggle="modal" data-target="#modelId" disabled>CẬP NHẬT THÔNG TIN</button>
                                 : <button type="button" className="btn  button_Form" data-toggle="modal" data-target="#modelId">CẬP NHẬT THÔNG TIN</button>
                           }

                        </div>
                        <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                           <div className="modal-dialog" role="document">

                              <div className="modal-content">
                                 <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                       <span aria-hidden="true">×</span>
                                    </button>
                                 </div>
                                 <div className="modal-body">
                                    < ModalForm lstBooking={lstBooking} />
                                 </div>

                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                     </div>
                     <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                        <div className="history_Info">
                           <h3>LỊCH SỬ ĐẶT VÉ</h3>
                           <table class="table">
                              <thead>
                                 <tr>
                                    <th>STT</th>
                                    <th>Tên phim</th>
                                    <th>ID</th>
                                    <th>Ngày & giờ đặt </th>
                                    <th>Giá</th>
                                    <th>Thông Tin đặt ghế</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {
                                    lstBooking.thongTinDatVe?.map((item, index) => {

                                       return (
                                          <tr key={index}>
                                             <td className="text-center font-weight-bold">{index + 1}</td>
                                             <td>{item.tenPhim}</td>
                                             <td>{item.maVe}</td>
                                             <td>{<span>
                                                {moment(item.ngayDat).format("DD.MM")} ~{" "}
                                                <span>
                                                   {moment(item.ngayDat).format("hh:mm a")}
                                                </span>
                                             </span>}</td>
                                             <td>{item.giaVe.toLocaleString()}</td>
                                             <td>
                                                <tr className="title_Info">
                                                   <th>STT</th>
                                                   <th>Ghế</th>
                                                   <th>Rạp</th>
                                                   <th>Hệ thống rạp</th>
                                                </tr>
                                                {item.danhSachGhe.map((item, index) => {
                                                   return (
                                                      <tr key={index}>
                                                         <td className="font-weight-bold">{index + 1}</td>
                                                         <td>{item.tenGhe}</td>
                                                         <td>{item.maHeThongRap}</td>
                                                         <td>{item.tenHeThongRap}</td>
                                                      </tr>
                                                   )
                                                })}
                                             </td>
                                          </tr>
                                       )

                                    })
                                 }
                              </tbody>
                           </table>
                           <div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section >
   )
}


