import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {Notifications, Permissions, Constants} from 'expo';

const PUSH_REGISTRATION_ENDPOINT = 'https://tranquil-cliffs-80326.herokuapp.com/token';
const MESSAGE_ENPOINT = 'http://192.168.1.3:3000/message';

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
        messageText: ''
    }

    async presentLocalNotification(title, body) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: title,
            body: body,
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
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
            // this.presentLocalNotification(notification.data.message.split('_')[0], notification.data.message.split('_')[1]);
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#474747',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 50,
        width: 300,
        borderColor: '#f6f6f6',
        borderWidth: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    button: {
        padding: 10
    },
    buttonText: {
        fontSize: 18,
        color: '#fff'
    },
    label: {
        fontSize: 18
    }
});
