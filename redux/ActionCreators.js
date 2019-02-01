import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchDishes = (category=-1, page=1) => (dispatch) => {
    let url = baseUrl + 'mobilefeed/data?page='+page;

    if(category!==-1){
        url = url + '&category='+category
    }

    dispatch(dishesLoading());

    return fetch(url)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => response.feeds)
        .then(dishes => {
            return dispatch(addDishes(dishes))
        })
        .catch(error => dispatch(dishesFailed(error.message)));
};

export const fetchFavorites = (email) => (dispatch) => {
    let url = baseUrl + 'favorites/data?email='+email;

    dispatch(favoritesLoading());

    return fetch(url)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => response.feeds)
        .then(dishes => {
            console.log('favorites12345');
            console.log(dishes);
            return dispatch(addFavorites(dishes))
        })
        .catch(error => dispatch(favoritesFailed(error.message)));
};


export const updatedDishes = () => (dispatch) => {

    dispatch(dishesLoading());

    return fetch(baseUrl + 'mobilefeed/data')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => response.feeds)
        .then(dishes => {
            console.log('helo12345');
            console.log(dishes);
            return dispatch(addDishes(dishes.slice(5, 9)))
        })
        .catch(error => dispatch(dishesFailed(error.message)));
};


export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.FETCH_FAVORITES,
    payload: favorites
});

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFavorite = (dishId)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
};


export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
});

export const postComment = (dishId, rating, author, comment)  => (dispatch) => {
    let commentPayload = {
        dishId: dishId,
        rating: rating,
        comment: comment,
        author: author,
        date: (new Date).toISOString()};
    setTimeout(() => {
        dispatch(addComment(commentPayload));
    }, 2000);
};

export const addComment = (commentPayload) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: commentPayload
});
