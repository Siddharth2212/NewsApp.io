import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {Notifications, Permissions, Constants} from 'expo';

const PUSH_REGISTRATION_ENDPOINT = 'http://192.168.1.3:3000/token';
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

    sendMessage = async () => {
        fetch(MESSAGE_ENPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: this.state.messageText,
            }),
        });
        this.setState({ messageText: '' });
    }

    renderNotification() {
        return(
            <View style={styles.container}>
                <Text style={styles.label}>A new message was recieved!</Text>
                <Text>{this.state.notification.data.message}</Text>
            </View>
        )
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
        this.setState({ notification });
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.messageText}
                    onChangeText={this.handleChangeText}
                    style={styles.textInput}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.sendMessage}
                >
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
                {this.state.notification ?
                    this.renderNotification()
                    : null}
            </View>
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
