import React from 'react'
import { Button, StyleSheet, Text, View , BackHandler} from 'react-native'
import { AuthSession, WebBrowser, Linking } from 'expo'
import {Header, SocialIcon} from 'react-native-elements';
import Home from './HomeComponent';
import {baseUrl} from "../shared/baseUrl";

export default class Login extends React.Component {
    state = {
        authResult: {},
    };
    componentDidMount(){
        console.log(this.props.navigation)
        BackHandler.addEventListener('hardwareBackPress', function() {
            return false;
        });
    }
    render() {
        return(
            <View style={{flex:1, width: this.props.width, backgroundColor: '#fff'}}>

                <SocialIcon
                    title='Sign In With Linkedin'
                    button
                    type='linkedin'
                    onPress={this.handleOAuthLogin}
                />
                <SocialIcon
                    title='Sign In With Twitter'
                    button
                    type='twitter'
                    onPress={this.handleOAuthLogin}
                />
            </View>
        )
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
            let authResult = await WebBrowser.openAuthSessionAsync(`https://tranquil-cliffs-80326.herokuapp.com/auth/linkedin`, redirectUrl)
            await this.setState({ authResult: authResult })
            const profile = await fetch(`https://tranquil-cliffs-80326.herokuapp.com/auth/profile`);

            console.log('HELLO');
            console.log(authResult);
            console.log(profile);
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
