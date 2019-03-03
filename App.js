import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

import React, { Component } from 'react';

import {Notifications, Permissions, Constants} from 'expo';

import { FontAwesome } from '@expo/vector-icons';


const PUSH_REGISTRATION_ENDPOINT = 'https://tranquil-cliffs-80326.herokuapp.com/token';

async function getToken() {
    // Remote notifications do not work in simulators, only on device
    if (!Constants.isDevice) {
        return;
    }
    let { status } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS,
    );
    if (status !== 'granted') {
        return;
    }
    let value = await Notifications.getExpoPushTokenAsync();
    console.log('Our token', value);
    return fetch(PUSH_REGISTRATION_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {
                value: value,
            },
            user: {
                username: 'warly',
                name: 'Dan Ward'
            },
        }),
    });
    /// Send this to a server
}

export default class App extends Component {
    state = {
        notification: null,
        messageText: '',
        isReady: false
    }

    componentDidMount() {
        getToken();

        this.listener = Notifications.addListener(this.handleNotification);
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }

    handleNotification = (notification) => {
        console.log(
            `Push notification ${notification.origin} with data: ${JSON.stringify(notification.data)}`,
        );
        if (notification.origin === 'received') {
            this.setState({ notification });
        }
    };

    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    loading={<Loading />}
                    persistor={persistor}>
                    <Main />
                </PersistGate>
            </Provider>
        );
    }
}
