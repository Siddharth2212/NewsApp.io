import * as ActionTypes from './ActionTypes';

export const userinfo = (state = { isLoading: true,
    errMess: null,
    userinfo:null}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERINFO:
            return {...state, isLoading: false, errMess: null, userinfo: action.payload};

        case ActionTypes.USERINFO_LOADING:
            return {...state, isLoading: true, errMess: null, userinfo: null}

        case ActionTypes.USERINFO_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};
