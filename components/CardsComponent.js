import React, { Component } from "react";
import { NetInfo, ToastAndroid } from 'react-native';
import Item from "./ItemComponent";
const catArray = ['Home', 'SEO', 'SEM', 'Analytics', 'Content marketing', 'Mobile', 'Social-media-marketing', 'Google-adwords', 'Facebook', 'India jobs', 'International-jobs', 'Freelancing jobs', 'Artificial Intelligence', 'Start Ups', 'Digital marketing tips', 'Guest posts', 'Snapchat', 'Instagram', 'Twitter', 'Whatsapp', 'Youtube', 'Cyber security', 'Technology tips']

class Cards extends Component {
    componentDidMount() {
        NetInfo.getConnectionInfo()
            .then((connectionInfo) => {
                ToastAndroid.show('Initial Network Connectivity Type: '
                    + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                    ToastAndroid.LONG)
            });

        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
                break;
            default:
                break;
        }
    }
    render() {
        console.log('HEYY');
        console.log(this.props);
        return (
            <Item navigation={this.props.navigation} category={catArray.indexOf(this.props.navigation.state.key)} />
        );
    };
}

export default  Cards ;
