"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MovieService =
/*#__PURE__*/
function () {
  function MovieService() {
    _classCallCheck(this, MovieService);
  }

  _createClass(MovieService, [{
    key: "fetchMovie",
    value: function fetchMovie() {
      return (0, _axios["default"])({
        method: 'GET',
        url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03'
      });
    }
  }, {
    key: "fetchMovieDetail",
    value: function fetchMovieDetail(id) {
      return (0, _axios["default"])({
        method: "GET",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=".concat(id)
      });
    }
  }, {
    key: "fetchCinema",
    value: function fetchCinema() {
      return (0, _axios["default"])({
        method: "GET",
        url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap'
      });
    }
  }, {
    key: "fetchCinemaGroup",
    value: function fetchCinemaGroup(id) {
      return (0, _axios["default"])({
        method: "GET",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=".concat(id)
      });
    }
  }, {
    key: "fetchShowtimeToCinemaGroup",
    value: function fetchShowtimeToCinemaGroup(id) {
      return (0, _axios["default"])({
        method: "GET",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=".concat(id, "&maNhom=GP03")
      });
    }
  }, {
    key: "fetchShowtimeToIdMovie",
    value: function fetchShowtimeToIdMovie(id) {
      return (0, _axios["default"])({
        method: "GET",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=".concat(id, "\n            ")
      });
    }
  }, {
    key: "fetchBookingTicket",
    value: function fetchBookingTicket(id) {
      return (0, _axios["default"])({
        method: "GET",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=".concat(id)
      });
    }
  }]);

  return MovieService;
}();

var _default = MovieService;
exports["default"] = _default;