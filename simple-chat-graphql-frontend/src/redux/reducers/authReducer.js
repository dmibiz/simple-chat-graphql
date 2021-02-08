import { SAVE_AUTHENTICATION, DELETE_AUTHENTICATION, RESTORE_AUTHENTICATION } from '../actions';
import { isTokenExpired, getAuthDataFromCookies } from '../../helpers/authHelper';
import { AUTH_COOKIE_KEY } from '../../constants';
import cookie from 'js-cookie';

const emptyState = {
    token: null,
    user: null
};

let initialState = emptyState;
const authDataFromCookies = getAuthDataFromCookies();

if (authDataFromCookies) {
    initialState = authDataFromCookies;
    if (isTokenExpired(initialState.token)) {
        cookie.remove(AUTH_COOKIE_KEY);
        initialState = emptyState;
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_AUTHENTICATION:
            cookie.set(AUTH_COOKIE_KEY, action.payload);
            return action.payload;
        case DELETE_AUTHENTICATION:
            cookie.remove(AUTH_COOKIE_KEY);
            return emptyState;
        case RESTORE_AUTHENTICATION:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;