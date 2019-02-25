import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import {AsyncStorage, Platform} from "react-native";
import {Google} from "expo";

export const fetchComments = (dishId) => (dispatch) => {
    return fetch(baseUrl + 'comments?newsid='+dishId)
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

export const fetchDishes = (category=-1, page=1, searchString=null) => (dispatch) => {
    let url = baseUrl + 'mobilefeed2/data?page='+page;

    if(category!==-1){
        url = url + '&category='+category
    }

    if(searchString){
        url = url + '&searchString='+searchString
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

export const postFavorite = (dishId, email)  => (dispatch) => {
    dispatch(favoritesLoading());

    return fetch(baseUrl + 'addfavorite?newsid='+dishId+'&userid='+email)
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
        .then(response => {
            return response.json()
        })
        .then(leaders => dispatch(fetchFavorites(email)))
        .catch(error => dispatch(favoritesFailed(error.message)));
};


export const deleteFavorite = (dishId, email)  => (dispatch) => {
    dispatch(favoritesLoading());

    return fetch(baseUrl + 'removefavorite?newsid='+dishId+'&userid='+email)
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
        .then(response => {
            return response.json()
        })
        .then(leaders => dispatch(fetchFavorites(email)))
        .catch(error => dispatch(favoritesFailed(error.message)));
};

export const setUri = (uri) => ({
    type: ActionTypes.SET_URI,
    payload: uri
});

export const setLoading = (loading) => ({
    type: ActionTypes.SET_LOADING,
    payload: loading
});

export const authenticate = (actiontype) =>async (dispatch) => {
    // dispatch(userinfoLoading());
    if(actiontype == 'signin'){
        try {
            let result;
            if(Platform.OS === 'android'){
                result = await Google.logInAsync({
                    androidClientId:
                        "762764011407-500q22dk4v57g1q8t6uglf2um5290gnb.apps.googleusercontent.com",
                    //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
                    scopes: ["profile", "email"]
                })
            }
            else{
                result = await Google.logInAsync({
                    /*androidClientId:
                        "762764011407-500q22dk4v57g1q8t6uglf2um5290gnb.apps.googleusercontent.com",*/
                    iosClientId: "762764011407-500q22dk4v57g1q8t6uglf2um5290gnb.apps.googleusercontent.com",
                    scopes: ["profile", "email"]
                })
            }

            if (result.type === "success") {
                let signinInfo = {
                    signedIn: true,
                    name: result.user.name,
                    email: result.user.email,
                    photoUrl: result.user.photoUrl
                }
                dispatch(addUserinfo(signinInfo))
                this._storeData('gmaillogin', JSON.stringify(signinInfo));
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }
    else{
        console.log('HEREE');
        await AsyncStorage.removeItem('gmaillogin');
        await AsyncStorage.removeItem('signedintoken');
        dispatch(addUserinfo(null))
    }
}

export const userinfoLoading = () => ({
    type: ActionTypes.USERINFO_LOADING
});

export const getUser = ({access_token}) =>async (dispatch) => {
    // this.setState({ refreshing: true })
    dispatch(userinfoLoading());
    const baseApi = 'https://api.linkedin.com/v1/people/'
    const qs = { format: 'json' }
    const params = [
        'first-name',
        'last-name',
        'picture-urls::(original)',
        'headline',
        'email-address',
        'num-connections',
        'num-connections-capped',
        'location'
    ]

    const response = await fetch(`${baseApi}~:(${params.join(',')})?format=json`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token+'',
        },
    })
    let payload = await response.json()

    if(payload.status && payload.status ==401){
        console.log('invalid access token');
        try {
            await AsyncStorage.removeItem('signedintoken');
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    }
    else{
        console.log(payload);
        payload.signedInLinkedin = true;
        this._storeData('signedintoken', access_token)
        // this.setState({signedInLinkedin: true})
    }

    const userinfo = await fetch('https://www.newsapp.io/userdata?email='+payload.emailAddress+'');

    const userinfodata = await userinfo.json();

    if(!userinfodata.error && userinfodata.college_name){
        payload.college_name = userinfodata.college_name
        payload.linkedinshares = userinfodata.linkedinshares
        payload.twittershares = userinfodata.twittershares
    }
    else{
        payload.college_name = 'NA'
        payload.linkedinshares = 0
        payload.twittershares = 0
    }
    dispatch(addUserinfo(payload))
    // this.setState({ ...payload, refreshing: false })
}

_storeData = async (key, token) => {
    try {
        await AsyncStorage.setItem(key, token);
    } catch (error) {
        console.log('error saving data');
        console.log(error);
        // Error saving data
    }
}

export const addUserinfo = (userinfo) => ({
    type: ActionTypes.ADD_USERINFO,
    payload: userinfo
});

export const postComment = (dishId, rating, email, comment)  => (dispatch) => {
    let commentPayload = {
        dishId: dishId,
        rating: rating,
        comment: comment,
        author: email,
        date: (new Date).toISOString()};
    dispatch(commentsLoading());

    return fetch(baseUrl + 'addcomment?newsid='+dishId+'&comment='+JSON.stringify(commentPayload))
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
        .then(response => {
            return response.json()
        })
        .then(leaders => dispatch())
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
});

export const addComment = (commentPayload) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: commentPayload
});
