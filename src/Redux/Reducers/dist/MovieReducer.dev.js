"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _type = require("../Actions/type");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  movies: [],
  movieDetail: null,
  cinema: [],
  cinemaGroup: [],
  maHeThongRap: null,
  lstMovie: [],
  lstSeatBooking: [],
  lstBooking: [],
  lstInfoMovieBooking: [],
  objBooking: [],
  boxBookingCinema: []
};

var MovieReducer = function MovieReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _type.FETCH_MOVIE:
      {
        state.movies = action.payload;
        return _objectSpread({}, state);
      }

    case _type.FETCH_MOVIE_DETAIL:
      {
        state.movieDetail = action.payload;
        return _objectSpread({}, state);
      }

    case _type.FETCH_CINEMA:
      {
        state.cinema = action.payload;
        return _objectSpread({}, state);
      }

    case _type.FETCH_CINEMA_GROUP:
      {
        state.cinemaGroup = action.payload;
        return _objectSpread({}, state);
      }

    case _type.CHANGE_ID:
      {
        state.maHeThongRap = action.payload;
        return _objectSpread({}, state);
      }

    case _type.LST_MOVIE:
      {
        state.lstMovie = action.payload;
        return _objectSpread({}, state);
      }

    case _type.CHECK_SEAT_BOOKING:
      {
        var lstSeatBookingUpdate = _toConsumableArray(state.lstSeatBooking);

        var index = lstSeatBookingUpdate.findIndex(function (gheDangDat) {
          return gheDangDat.stt === action.payload.stt && gheDangDat.rowSeat === action.payload.rowSeat;
        });

        if (index !== -1) {
          lstSeatBookingUpdate.splice(index, 1);
        } else {
          lstSeatBookingUpdate.push(action.payload);
        }

        state.lstSeatBooking = lstSeatBookingUpdate;
        return _objectSpread({}, state);
      }

    case _type.LSTBOOKING_TO_SEATLST:
      {
        state.objBooking = action.payload;
        return _objectSpread({}, state);
      }

    default:
      return state;
  }
};

var _default = MovieReducer;
exports["default"] = _default;