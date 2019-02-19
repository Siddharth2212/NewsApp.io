import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthSession, WebBrowser, Linking } from 'expo'
import {Header} from "react-native-elements";

export default class Login extends React.Component {
    state = {
        authResult: {},
    };
    render() {
        if (this.state.authResult.type && this.state.authResult.type === 'success') {
            return (
                <View style={styles.container}>
                    <Text>{`Hey there, user!`}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        barStyle="light-content" // or directly
                        rightComponent={{ icon: 'chevron-right', style: { color: '#fff' }, onPress: () =>  this.props.flatListRef.scrollToIndex({animated: true, index: 0})}}
                        centerComponent={{ text: 'NewsApp.io', style: { color: '#fff' } }}
                        containerStyle={{
                            backgroundColor: '#2196f3',
                            justifyContent: 'space-around',
                        }}
                    />
                    <Button title="Login with LinkedIn" onPress={this.handleOAuthLogin} />
                </View>
            )
        }
    }
    handleRedirect = async event => {
        WebBrowser.dismissBrowser()
    }
    handleOAuthLogin = async () => {
        // gets the app's deep link
        let redirectUrl = await Linking.getInitialURL()
        // this should change depending on where the server is running
        let authUrl = `https://tranquil-cliffs-80326.herokuapp.com/auth/twitter`
        this.addLinkingListener()
        try {
            let authResult = await WebBrowser.openAuthSessionAsync(`https://tranquil-cliffs-80326.herokuapp.com/auth/twitter`, redirectUrl)
            await this.setState({ authResult: authResult })
        } catch (err) {
            console.log('ERROR:', err)
        }
        this.removeLinkingListener()
    }
    addLinkingListener = () => {
        Linking.addEventListener('url', this.handleRedirect)
    }
    removeLinkingListener = () => {
        Linking.removeEventListener('url', this.handleRedirect)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
