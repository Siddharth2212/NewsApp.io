import React, { Component } from 'react';
import Swiper from 'react-native-swiper'
import randomcolor from 'randomcolor'
import News from "./NewsComponent";
import Browser from "./WebviewComponent";
import Leftbar from "./LeftbarComponent";

import {
    View,
    Text,
    StyleSheet, Platform, BackHandler, Dimensions
} from 'react-native';
var { width, height } = Dimensions.get('window');// You can import from local files

class TitleText extends Component {
    render() {
        return (
            <Text style={{ fontSize: 48, color: 'white' }}>
                {this.props.label}
            </Text>
        )
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: 'left'
        };
    }

    viewStyle() {
        return {
            flex: 1,
            backgroundColor: randomcolor(),
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    onIndexChange = index => {
        if(index == 0){
            console.log('HERE'+index);
        }
        else if(index ==1){
            console.log('HERE'+index);
        }
        else if(index==2){
            console.log('HERE'+index);
        }
    };

    jumpToSlide (value) {
        if (Platform.OS === 'android') {
            this.refs.swiper.scrollView.setPage(value); // n is the number of places to move the swipe, eg: 2, -1, etc.
        } else {
            this.refs.swiper.scrollView.scrollTo({x: this.swiper.state.width * index});
        }
    }

    render() {
        return (
            <Swiper
                onIndexChanged={this.onIndexChange.bind(this)}
                loop={false}
                showsPagination={false}
                ref="swiper"
                index={1}>
                <Leftbar swipe={(value) => this.jumpToSlide(value)} width={width} navigation={this.props.navigation} />
                <News navigation={this.props.navigation} />
                <Browser swipe={(value) => this.jumpToSlide(value)} navigation={this.props.navigation} />
            </Swiper>

        )
    }
}

export default Home;
