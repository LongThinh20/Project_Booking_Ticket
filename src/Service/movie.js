import Axios from 'axios';
import { domain } from '../Config/config'

class MovieService {
    fetchMovie() {
        return Axios({
            method: 'GET',
            url: `${domain}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03`,
        })
    }

    fetchMovieDetail(id) {
        return Axios({
            method: "GET",
            url: `${domain}/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
        })
    }

    fetchCinema() {
        return Axios({
            method: "GET",
            url: `${domain}/api/QuanLyRap/LayThongTinHeThongRap`
        })
    }

    fetchCinemaGroup(id) {
        return Axios({
            method: "GET",
            url: `${domain}/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`
        })
    }
    fetchShowtimeToCinemaGroup(id) {
        return Axios({
            method: "GET",
            url: `${domain}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${id}&maNhom=GP03`
        })
    }

    fetchShowtimeToIdMovie(id) {
        return Axios({
            method: "GET",
            url: `${domain}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
        })
    }

    fetchBookingTicket(id) {
        return Axios({
            method: "GET",
            url: `${domain}/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
        })
    }

    booking(data, token) {
        return Axios({
            method: "POST",
            url: `${domain}/api/QuanLyDatVe/DatVe`,
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`

            }
        })
    }
    deleteMovie(id, token) {
        return Axios({
            url: `${domain}/api/QuanLyPhim/XoaPhim?MaPhim=${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    addMovie(data) {
        return Axios({
            method: 'POST',
            url: `${domain}/api/QuanLyPhim/ThemPhimUploadHinh`,
            data: data
        })
    }
    updateMovie(data, token) {
        return Axios({
            method: 'POST',
            url: `${domain}/api/QuanLyPhim/CapNhatPhimUpload`,
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}
export default MovieService;