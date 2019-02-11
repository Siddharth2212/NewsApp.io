import React, { Component } from 'react';
import { View, Dimensions, ActivityIndicator, WebView, StyleSheet, Platform } from 'react-native';
var {width, height} = Dimensions.get('window');// You can import from local files
import {Header} from 'react-native-elements';
import {EXTRACTHOSTNAME} from "../utils/extracthostname";
import {GETHOSTNAME} from "../utils/gethostname";
import {connect} from "react-redux";
import {setUri} from "../redux/ActionCreators";
import { Constants, WebBrowser } from 'expo';

const styles = StyleSheet.create(
    {

        WebViewStyle:
            {
                justifyContent: 'center',
                alignItems: 'center',
                flex:1
            },

        ActivityIndicatorStyle:{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'

        }
    });

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

const mapDispatchToProps = dispatch => ({
    setUri: (uri) => dispatch(setUri(uri))
})

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: width,
            height: height,
            data: [],
            page: 1,
            count: 1,
            inProgressNetworkReq: false,
            result: null
        };
    }

    ActivityIndicatorLoadingView() {

        return (

            <ActivityIndicator
                color='#009688'
                size='large'
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    render() {
        let newsLink = (newsfeed) => {
            var itemlink = ((typeof newsfeed.added!='undefined' && newsfeed.added == 'true') ? EXTRACTHOSTNAME(newsfeed.link) : GETHOSTNAME(newsfeed.link.split('url=')[1], newsfeed));
            return itemlink;
        }
        return(
            <View style={{flex:1, backgroundColor: 'blue'}}>
                <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () =>  this.props.swipe(1) }}
                    centerComponent={{ text: newsLink({link: this.props.dishes.uri}), style: { color: '#fff' } }}
                    // rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <View style={{flex:1, backgroundColor: 'blue'}}>
                    <WebView
                        style={styles.WebViewStyle}
                        source={{uri: this.props.dishes.uri}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        renderLoading={this.ActivityIndicatorLoadingView}
                        startInLoadingState={true}
                    />
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
