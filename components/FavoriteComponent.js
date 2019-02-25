import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import {deleteFavorite, fetchFavorites} from "../redux/ActionCreators";
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
    fetchFavorites: (email) => dispatch(fetchFavorites(email))
})

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    componentDidMount(){
        this.props.fetchFavorites("siddharthsogani1@gmail.com");
    }

    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite dish ' + item.approved_title + '?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(item.approved_title + 'Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.newsid)
                                }
                            ],
                            { cancelable: false }
                        );

                    }
                }
            ];

            return (
                <Swipeout right={rightButton} autoClose={true}>
                        <ListItem
                            key={index}
                            title={item.approved_title}
                            hideChevron={true}
                            onPress={() => navigate('Dishdetail', { dish: item })}
                            leftAvatar={{ source: {uri: item.approved_image}}}
                        />
                </Swipeout>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
            return (
                <FlatList
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.newsid.toString()}
                />
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
