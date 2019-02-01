import * as ActionTypes from './ActionTypes';

export const favorites = (state = { isLoading: true,
    errMess: null,
    favorites:[]}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_FAVORITES:
            return {...state, isLoading: false, errMess: null, favorites: action.payload};

        case ActionTypes.FAVORITES_LOADING:
            return {...state, isLoading: true, errMess: null, favorites: []}

        case ActionTypes.FAVORITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};
