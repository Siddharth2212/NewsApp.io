import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, NetInfo, ToastAndroid } from 'react-native';
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';
import {
    fetchDishes, fetchComments, fetchLeaders, updatedDishes,
    fetchFavorites
} from '../redux/ActionCreators';
import {Cards} from "./CardsComponent";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#2196f3',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        width: 200,
        height: 60,
        marginLeft:10
    }
});

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchFavorites: (email) => dispatch(fetchFavorites(email)),
    fetchLeaders: () => dispatch(fetchLeaders()),
    updateDishes: () => dispatch(updatedDishes()),
})

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchFavorites("siddharthsogani1@gmail.com");
        this.props.fetchLeaders();

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
        return (
            <View style={{flex:1}}>
                <Text>Hello</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
