import { combineReducers } from 'redux';
import rateReducer from './converter/reducers';

const rootReducer = combineReducers({
    rateReducer,
});

export default rootReducer;