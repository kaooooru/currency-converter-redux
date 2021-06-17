import { 
    FETCH_EXCHANGE_RATE_STARTED,
    FETCH_EXCHANGE_RATE_SUCCESS,
    FETCH_EXCHANGE_RATE_FAIL
} from './constants';
import { message } from "antd";

const initialState = {
    loading: false,
    rate: ''
};

const rateReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_EXCHANGE_RATE_STARTED:
            return {
                ...state,
                loading: true
            };
        
        case FETCH_EXCHANGE_RATE_SUCCESS:
            return {
                loading: false,
                rate: action.payload
            };
        
        case FETCH_EXCHANGE_RATE_FAIL:
            message.info(action.payload);
            return {
                loading: false,
                rate: '',
                err: action.payload
            };
        default:
            return state;
            
    };
};

export default rateReducer;