import jwt_decode from 'jwt-decode';
import cookie from 'js-cookie';
import { AUTH_COOKIE_KEY } from '../constants';

export const isTokenExpired = (token) => {
    if (!token) return false;

    const decodedToken = jwt_decode(token);
    const currentDate = new Date().getTime() / 1000;
    return currentDate >= decodedToken.exp;
}

export const isAuthenticated = (authData) => {
    return authData.token && !isTokenExpired(authData.token) && authData.user;
}

export const getAuthDataFromCookies = () => {
    const authCookie = cookie.get(AUTH_COOKIE_KEY);

    if (authCookie) {
        return JSON.parse(decodeURIComponent(authCookie));
    }

    return null;
}

