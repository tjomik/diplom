import axios from "axios";
import {checkAuthorization} from "./auth";

export const ipAddress = 'http://127.0.0.1:8000'

export const makeGuestRequest = async (url, axiosArgs = {}) => {
    return axios({
        url: ipAddress + '/api/' + url,
        method: 'GET',
        headers: {
            Authorization: 'Bearer: ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
        },
        ...axiosArgs
    });
};
export const makeRequest = async (url, axiosArgs = {}) => {
    await checkAuthorization();
    return makeGuestRequest(url, {
        headers: {
            Authorization: 'Bearer: ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
        },
        ...axiosArgs
    });
};

