import { 
    FETCH_EXCHANGE_RATE_STARTED,
    FETCH_EXCHANGE_RATE_SUCCESS,
    FETCH_EXCHANGE_RATE_FAIL
} from './constants';

export const fetchExchangeRateStarted = () => ({
    type: FETCH_EXCHANGE_RATE_STARTED
});

export const fetchExchangeRateSuccess = (rate) => ({
    type: FETCH_EXCHANGE_RATE_SUCCESS,
    payload: rate
});

export const fetchExchangeRateFail = (err) => ({
    type: FETCH_EXCHANGE_RATE_FAIL,
    payload: err
});

