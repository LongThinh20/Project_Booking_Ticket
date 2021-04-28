"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.signupUserSchema = void 0;

var _axios = _interopRequireDefault(require("axios"));

var yup = _interopRequireWildcard(require("yup"));

var _config = require("../Config/config");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var signupUserSchema = yup.object().shape({
  taiKhoan: yup.string().required("* Tài khoản không được rỗng !"),
  matKhau: yup.string().required("* Mật khẩu không được rỗng !").min(8, 'Mật khẩu ít nhất 8 kí tự'),
  hoTen: yup.string().required("* Họ tên không được rỗng !").min(5, 'Họ tên phải lớn hơn 5 kí tự').max(20, 'Họ tên phải nhỏ hơn 10 kí tự'),
  email: yup.string().required("* Tài khoản không được rỗng !").email("* Email không hợp lệ"),
  soDt: yup.string().matches(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/, "Số điện thoại không hợp lệ"),
  maNhom: yup.string().required("* Mã nhóm không để trống ")
});
exports.signupUserSchema = signupUserSchema;

var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, [{
    key: "signUp",
    value: function signUp(data) {
      return (0, _axios["default"])({
        method: "POST",
        url: "".concat(_config.domain, "/api/QuanLyNguoiDung/DangKy"),
        data: data
      });
    }
  }, {
    key: "signIn",
    value: function signIn(user) {
      return (0, _axios["default"])({
        method: "POST",
        url: "".concat(_config.domain, "/api/QuanLyNguoiDung/DangNhap"),
        data: user
      });
    }
  }, {
    key: "getInfo",
    value: function getInfo() {
      return (0, _axios["default"])({
        method: "GET",
        url: "".concat(_config.domain, "/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03")
      });
    }
  }, {
    key: "upDateInfo",
    value: function upDateInfo(user, accessToken) {
      return (0, _axios["default"])({
        method: "PUT",
        url: "".concat(_config.domain, "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung"),
        data: user,
        headers: {
          'Authorization': "Bearer ".concat(accessToken)
        }
      });
    }
  }, {
    key: "dedeteUser",
    value: function dedeteUser(user, accessToken) {
      return (0, _axios["default"])({
        method: "DELETE",
        url: "".concat(_config.domain, "/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=").concat(user),
        data: user,
        headers: {
          'Authorization': "Bearer ".concat(accessToken)
        }
      });
    }
  }, {
    key: "getPersonal",
    value: function getPersonal(user) {
      return (0, _axios["default"])({
        method: "POST",
        url: "".concat(_config.domain, "/api/QuanLyNguoiDung/ThongTinTaiKhoan"),
        data: user
      });
    }
  }]);

  return UserService;
}();

var _default = UserService;
exports["default"] = _default;