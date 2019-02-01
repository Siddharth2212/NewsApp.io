import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Item from "./ItemComponent";
const catArray = ['Home', 'SEO', 'SEM', 'Analytics', 'Content marketing', 'Mobile', 'Social-media-marketing', 'Google-adwords', 'Facebook', 'India jobs', 'International-jobs', 'Freelancing jobs', 'Artificial Intelligence', 'Start ups', 'Digital marketing tips', 'Guest posts', 'Snapchat', 'Instagram', 'Twitter', 'Whatsapp', 'Youtube', 'Cyber security', 'Technology tips']

class Cards extends Component {
    render() {
        console.log('HEYY');
        console.log(this.props);
        return (
            <Item navigation={this.props.navigation} category={catArray.indexOf(this.props.navigation.state.key)} />
        );
    };
}

export { Cards };
