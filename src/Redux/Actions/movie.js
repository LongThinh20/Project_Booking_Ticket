import {createAction} from './index'
import {movieService} from '../../Service';
const { FETCH_MOVIE, FETCH_MOVIE_DETAIL, FETCH_CINEMA, FETCH_CINEMA_GROUP } = require("./type");


export const fetchMovieAction = () => {
    return (dispatch) => {
        movieService.fetchMovie()
            .then(res => {
                dispatch(createAction(FETCH_MOVIE, res.data));
            }).catch(err => {
                console.log(err);
            })
    }
}
export const fetchMovieDetailAction = (id) => {

    return (dispatch) => {
        movieService.fetchMovieDetail(id)
            .then(res => {
                dispatch(createAction(FETCH_MOVIE_DETAIL, res.data));
            }).catch(err => {
                console.log(err);
            })
    }
}

export const fetchCinemaAction = () => {
    return (dispatch) => {
        movieService.fetchCinema()
            .then(res => {
                dispatch(createAction(FETCH_CINEMA, res.data));
            }).catch(err => {
                console.log(err);
            })
    }
}

export const fetchCinemaGroupAction = (id) => {
    return (dispatch) => {
        movieService.fetchCinemaGroup(id)
            .then(res => {
                dispatch(createAction(FETCH_CINEMA_GROUP, res.data));
            }).catch(err => {
                console.log(err);
            })
    }
}