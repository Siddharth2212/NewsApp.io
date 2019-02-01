import React, {Component} from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}


class Menu extends Component {
    static navigationOptions = {
        title : 'Menu'
    };

    render(){
        const renderMenuItem = ({item, index}) => {

            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <Tile
                        key={index}
                        title={item.approved_title}
                        caption={item.approved_description}
                        featured
                        onPress={() => navigate('Dishdetail', { dishId: item.newsid })}
                        imageSrc={{ uri: baseUrl + item.approved_image}}
                    />
                </Animatable.View>
            );
        };

        const {navigate} = this.props.navigation;

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>
                    <Text>{props.dishes.errMess}</Text>
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


export default connect(mapStateToProps)(Menu);
