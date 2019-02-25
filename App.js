import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

import React, { Component } from 'react';

import {Notifications, Permissions, Constants, Asset, AppLoading, Font} from 'expo';

import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

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

    async _loadAssetsAsync() {
        const imageAssets = cacheImages([
            'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
        ]);

        const fontAssets = cacheFonts([FontAwesome.font]);

        await Promise.all([...imageAssets, ...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }

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
