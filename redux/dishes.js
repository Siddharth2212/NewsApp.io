import * as ActionTypes from './ActionTypes';

export const dishes = (state = { isLoading: true,
    errMess: null,
    dishes:[], page:1, uri: 'https://www.newsapp.io', loading: false}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload, page: state.page+1};

        case ActionTypes.SET_URI:
            return {...state, isLoading: false, errMess: null, uri: action.payload};

        case ActionTypes.SET_LOADING:
            return {...state, isLoading: false, errMess: null, loading: action.payload};

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []}

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};
