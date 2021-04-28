import { combineReducers } from 'redux';
import MovieReducer from './MovieReducer';
import UserReducer from './UserReducer'
const RootReducer = combineReducers({
    movie: MovieReducer,
    user : UserReducer
});

export default RootReducer;