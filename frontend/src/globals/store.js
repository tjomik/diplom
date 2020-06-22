import {createStore} from 'redux'

const initialState = {
    username: '',
    isAuthorized: false,
    showError: false,
    errorMessage: ''
};

const ActionTypes = {
    USER_CHANGE_DATA: 'USER_CHANGE_DATA',
    USER_REFRESH_AUTHORIZED: 'USER_REFRESH_AUTHORIZED',
    USER_LOGOUT: 'USER_LOGOUT',
    SHOW_ERROR: 'SHOW_ERROR',
    HIDE_ERROR: 'HIDE_ERROR',
};

const actions = {
    userChangeDataAction(username) {
        return {
            type: ActionTypes.USER_CHANGE_DATA,
            payload: {
                username
            }
        };
    },

    userRefreshAuthorizedAction(isAuthorized) {
        return {
            type: ActionTypes.USER_REFRESH_AUTHORIZED,
            payload: {
                isAuthorized
            }
        };
    },

    userLogoutAction() {
        return {
            type: ActionTypes.USER_LOGOUT
        };
    },

    showErrorAction(errorMessage) {
        return {
            type: ActionTypes.SHOW_ERROR,
            payload: {
                errorMessage
            }
        };
    },

    hideErrorAction() {
        return {
            type: ActionTypes.HIDE_ERROR
        };
    }
};


function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.USER_CHANGE_DATA:
            return {
                ...state,
                username: action.payload.username,
            };
        case ActionTypes.USER_REFRESH_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.payload.isAuthorized
            };
        case ActionTypes.USER_LOGOUT:
            return initialState;
        case ActionTypes.SHOW_ERROR:
            return {
                ...state,
                showError: true,
                errorMessage: action.payload.errorMessage,
            };
        case ActionTypes.HIDE_ERROR:
            return {
                ...state,
                showError: false,
                message: undefined,
            };
        default:
            return {...state};
    }
}

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
export {actions};