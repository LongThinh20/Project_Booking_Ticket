"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.login = void 0;

var _ = require(".");

var _index = require("../../Service/index");

var _type = require("./type");

var _sweetalert = _interopRequireDefault(require("sweetalert"));

var _sweetalert2 = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(user) {
  return function (dispatch) {
    _index.userService.signIn(user).then(function (res) {
      dispatch((0, _.createAction)(_type.FETCH_CREDENTIALS, res.data));
      (0, _sweetalert["default"])({
        title: "Đăng nhập thành công !",
        icon: "success",
        button: "OK"
      }).then(function (value) {
        window.location.replace("/");
      });

      if (typeof Storage !== 'undefined') {
        localStorage.setItem('credentials', JSON.stringify(res.data));
      } else {
        alert('Trình duyệt của bạn không hỗ trợ localStorage. Hãy nâng cấp trình duyệt để sử dụng!');
      } // localStorage.setItem('token', res.data.accessToken);
      // localStorage.setItem('userLogin', res.data)

    })["catch"](function (err) {
      console.log(err.response.data);
      (0, _sweetalert["default"])({
        title: "THÔNG TIN CHƯA CHÍNH XÁC",
        text: "Tài khoản hoặc mật khẩu chưa đúng !!!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(function (value) {
        if (value) {} else {
          window.location.replace("/");
        }
      });
    });
  };
};

exports.login = login;

var update = function update(user, credentials) {
  return function (dispatch) {
    _index.userService.upDateInfo(user, credentials).then(function (res) {
      dispatch((0, _.createAction)(_type.FETCH_CREDENTIALS, res.data));

      _sweetalert2["default"].fire({
        title: 'Cập nhật thành công !!',
        icon: 'success',
        confirmButtonText: 'OK',
        showCancelButton: false,
        showCloseButton: true
      }).then(function (result) {
        console.log(res.data);
        window.location.replace("/");
      });
    })["catch"](function (err) {
      _sweetalert2["default"].fire({
        title: 'Cập nhật thất bại  thành công !!',
        text: "".concat(err.response.data),
        icon: 'error',
        confirmButtonText: 'OK',
        showCancelButton: false,
        showCloseButton: true
      });
    });
  };
};

exports.update = update;