import {makeGuestRequest} from "./api";
import store, {actions} from './store'

export const parseJwt = token => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
};

export const checkJwt = async () => {
    if (
        localStorage.hasOwnProperty('access_token') &&
        localStorage.hasOwnProperty('refresh_token')
    ) {
        const accessData = await parseJwt(localStorage.getItem('access_token'));
        const refreshData = await parseJwt(localStorage.getItem('refresh_token'));
        store.dispatch(actions.userChangeDataAction(accessData.username));


        if (accessData.exp > Date.now() / 1000) {
            return Promise.resolve(1);
        } else {
            if (refreshData.exp > Date.now() / 1000) {
                try {
                    const response = await makeGuestRequest('token/refresh', {
                        method: 'POST',
                        data: {refresh: localStorage.getItem('refresh_token')}
                    });

                    localStorage.setItem('access_token', response.data['access']);
                    return Promise.resolve(true);
                } catch (e) {
                    store.dispatch(actions.showErrorAction('Произошла ошибка авторизации.'));
                    return Promise.resolve(false);
                }
            } else {
                return Promise.resolve(false);
            }
        }
    } else {
        return Promise.resolve(false);
    }
};

export const checkAuthorization = async () => {
    const isAuthorized = await checkJwt();
    store.dispatch(actions.userRefreshAuthorizedAction(isAuthorized));

    if (isAuthorized) {
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
};



export const Authorize = async (username, password) => {
    try {
        const response = await makeGuestRequest('token', {
            method: 'POST',
            data: {
                username: username,
                password: password
            }
        });

        if (response.data.hasOwnProperty('access')) {
            localStorage.setItem('access_token', response.data['access']);
            localStorage.setItem('refresh_token', response.data['refresh']);
            window.location.reload();
        }
    } catch (e) {
        store.dispatch(actions.showErrorAction('Неверные данные'))
        console.log(e.message)
    }

};