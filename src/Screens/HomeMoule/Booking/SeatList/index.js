import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import usePageLoading from '../../../../Components/Hook/usePageLoading';
import { movieService } from '../../../../Service';


export default function SeatList(props) {


    const [loader, showLoader, hideLoader] = usePageLoading();
    let [lstBookingTicket, setlstBookingTicket] = useState({});
    let [danhSachGheDangDat, setDanhSachGheDangDat] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        showLoader();

        movieService.fetchBookingTicket(props.param)
            .then(res => {

                hideLoader();

                setlstBookingTicket(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [JSON.stringify(lstBookingTicket)])

    let datGhe = (ghe) => {

        let danhSachGheDangDatUpdate = [...danhSachGheDangDat];
        let index = danhSachGheDangDatUpdate.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);
        if (index !== -1) {
            danhSachGheDangDatUpdate.splice(index, 1);
        } else {
            danhSachGheDangDatUpdate.push(ghe);
        }
        setDanhSachGheDangDat(danhSachGheDangDatUpdate)

        dispatch({
            type: 'LSTBOOKING_TO_SEATLST',
            payload: danhSachGheDangDat
        })
    }

    const booking = (rowSeat, stt, price, type, id) => {

        let lstSeatBooking = {
            rowSeat: rowSeat,
            stt: stt,
            price: price,
            type: type,
            id: id
        }


        dispatch({
            type: 'CHECK_SEAT_BOOKING',
            payload: lstSeatBooking
        })

    }

    //render ListSeat
    const rowSeatLst = []

    for (let i = 65; i <= 74; i++) {

        rowSeatLst.push(String.fromCharCode(i))

    }
    let indexA = 0;
    //render ListSeat




    return (


        <>

            {
                rowSeatLst.map((row, index) => {
                    return (
                        <>
                            <button className="rowSeat" key={index}>{row}</button>

                            {

                                lstBookingTicket.danhSachGhe?.slice(indexA, indexA += 16).map((ghe, index) => {

                                    let i = index + 1;

                                    let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';

                                    let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);


                                    let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

                                    return (ghe.daDat ? <button key={index} className=" seatBooking">
                                        X </button>
                                        :
                                        <button key={index} onClick={() => { datGhe(ghe); booking(`${row}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
                                            {i}
                                        </button>)

                                })
                            }
                            <br />
                        </>
                    )
                })
            }
            {loader}
        </>


        // <table style={{ margin: 'auto' }}>
        //     <tbody>
        //         <tr>
        //             <td className="rowSeat">{A}</td>
        //             <td>
        //                 {

        //                     lstBookingTicket.danhSachGhe?.slice(0, 16).map((ghe, index) => {

        //                         let i = index + 1;

        //                         let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';

        //                         let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);


        //                         let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

        //                         return (ghe.daDat ? <button key={index} className=" seatBooking">
        //                             X </button>
        //                             :
        //                             <button key={index} onClick={() => { datGhe(ghe); booking(`${A}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
        //                                 {i}
        //                             </button>)

        //                     })
        //                 }
        //             </td>
        //         </tr>
        //         <tr>
        //             <td className="rowSeat">{B}</td>
        //             <td>
        //                 {
        //                     lstBookingTicket.danhSachGhe?.slice(16, 32).map((ghe, index) => {

        //                         let i = index + 1;

        //                         let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';

        //                         let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);

        //                         let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

        //                         return ghe.daDat ? <button key={index} className=" seatBooking">
        //                             X </button>
        //                             :
        //                             <button key={index} onClick={() => { datGhe(ghe); booking(`${B}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
        //                                 {i}
        //                             </button>
        //                     })
        //                 }
        //             </td>
        //         </tr>
        //         <tr>
        //             <td className="rowSeat">{C}</td>
        //             <td>
        //                 {
        //                     lstBookingTicket.danhSachGhe?.slice(32, 48).map((ghe, index) => {

        //                         let i = index + 1;

        //                         let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';



        //                         let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);

        //                         let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

        //                         return ghe.daDat ? <button key={index} className=" seatBooking">
        //                             X </button>
        //                             :
        //                             <button key={index} onClick={() => { datGhe(ghe); booking(`${C}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
        //                                 {i}
        //                             </button>
        //                     })
        //                 }
        //             </td>
        //         </tr>
        //         <tr>
        //             <td className="rowSeat">{D}</td>
        //             <td>
        //                 {
        //                     lstBookingTicket.danhSachGhe?.slice(48, 64).map((ghe, index) => {

        //                         let i = index + 1;

        //                         let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';

        //                         let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);

        //                         let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

        //                         return ghe.daDat ? <button key={index} className=" seatBooking">
        //                             X </button>
        //                             :
        //                             <button key={index} onClick={() => { datGhe(ghe); booking(`${D}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
        //                                 {i}
        //                             </button>
        //                     })
        //                 }
        //             </td>
        //         </tr>
        //         <tr>
        //             <td className="rowSeat">{E}</td>
        //             <td>
        //                 {
        //                     lstBookingTicket.danhSachGhe?.slice(64, 80).map((ghe, index) => {

        //                         let i = index + 1;

        //                         let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';

        //                         let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);

        //                         let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

        //                         return ghe.daDat ? <button key={index} className=" seatBooking">
        //                             X </button>
        //                             :
        //                             <button key={index} onClick={() => { datGhe(ghe); booking(`${E}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
        //                                 {i}
        //                             </button>
        //                     })
        //                 }
        //             </td>
        //         </tr>
        //         <tr>
        //             <td className="rowSeat">{F}</td>
        //             <td>
        //                 {
        //                     lstBookingTicket.danhSachGhe?.slice(80, 96).map((ghe, index) => {

        //                         let i = index + 1;

        //                         let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';

        //                         let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);

        //                         let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

        //                         return ghe.daDat ? <button key={index} className=" seatBooking">
        //                             X </button>
        //                             :
        //                             <button key={index} onClick={() => { datGhe(ghe); booking(`${F}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
        //                                 {i}
        //                             </button>
        //                     })
        //                 }
        //             </td>
        //         </tr>
        //         <tr>
        //             <td className="rowSeat">{G}</td>
        //             <td>
        //                 {
        //                     lstBookingTicket.danhSachGhe?.slice(96, 112).map((ghe, index) => {

        //                         let i = index + 1;

        //                         let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';

        //                         let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);

        //                         let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

        //                         return ghe.daDat ? <button key={index} className=" seatBooking">
        //                             X </button>
        //                             :
        //                             <button key={index} onClick={() => { datGhe(ghe); booking(`${G}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
        //                                 {i}
        //                             </button>
        //                     })
        //                 }
        //             </td>
        //         </tr>
        //         <tr>
        //             <td className="rowSeat">{H}</td>
        //             <td>
        //                 {
        //                     lstBookingTicket.danhSachGhe?.slice(112, 128).map((ghe, index) => {

        //                         let i = index + 1;

        //                         let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';


        //                         let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);

        //                         let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

        //                         return ghe.daDat ? <button key={index} className=" seatBooking">
        //                             X </button>
        //                             :
        //                             <button key={index} onClick={() => { datGhe(ghe); booking(`${H}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
        //                                 {i}
        //                             </button>
        //                     })
        //                 }
        //             </td>
        //         </tr>
        //         <tr>
        //             <td className="rowSeat">{I}</td>
        //             <td>
        //                 {
        //                     lstBookingTicket.danhSachGhe?.slice(128, 144).map((ghe, index) => {

        //                         let i = index + 1;
        //                         let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';


        //                         let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);
        //                         let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

        //                         return ghe.daDat ? <button key={index} className=" seatBooking">
        //                             X </button>
        //                             :
        //                             <button key={index} onClick={() => { datGhe(ghe); booking(`${I}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
        //                                 {i}
        //                             </button>
        //                     })
        //                 }
        //             </td>
        //         </tr>
        //         <tr>
        //             <td className="rowSeat">{J}</td>
        //             <td>
        //                 {
        //                     lstBookingTicket.danhSachGhe?.slice(144, 160).map((ghe, index) => {

        //                         let i = index + 1;
        //                         let classGheVip = ghe.loaiGhe === 'Vip' ? 'seatVip' : '';


        //                         let indexGhe = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);

        //                         let classGheDangDat = indexGhe !== -1 ? 'seatSelect' : '';

        //                         return ghe.daDat ? <button key={index} className=" seatBooking">
        //                             X </button>
        //                             :
        //                             <button key={index} onClick={() => { datGhe(ghe); booking(`${J}`, i, ghe.giaVe, ghe.loaiGhe, ghe.maGhe) }} className={` seat ${classGheDangDat}  ${classGheVip} `}>
        //                                 {i}
        //                             </button>
        //                     })
        //                 }
        //             </td>
        //         </tr>
        //         {loader}
        //     </tbody>
        // </table>


    )
}
