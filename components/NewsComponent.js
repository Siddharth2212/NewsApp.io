import React, { Component } from 'react';
import {Button, View, Dimensions, FlatList, ActivityIndicator, Share} from 'react-native';
var {width, height} = Dimensions.get('window');// You can import from local files
import { Loading } from './LoadingComponent';
import { Card, Icon, Button as Alias, Image, Text} from 'react-native-elements';
import {DataCall} from "../utils/DataCall";
import {EXTRACTHOSTNAME} from "../utils/extracthostname";
import {GETHOSTNAME} from "../utils/gethostname";
import {TIMESINCE} from "../utils/timesince";
import {connect} from "react-redux";
import {setUri} from "../redux/ActionCreators";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {WebBrowser} from "expo";

let catArray = ['home', 'search-engine-optimization', 'search-engine-marketing', 'analytics', 'content-marketing', 'mobile', 'social-media-marketing', 'google-adwords', 'facebook', 'india-jobs', 'international-jobs', 'freelancing-jobs', 'artificial-intelligence', 'entrepreneurship', 'digital-marketing-tips', 'post', 'snapchat', 'instagram', 'twitter', 'whatsapp', 'youtube', 'cyber-security', 'technology-tips']

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

const mapDispatchToProps = dispatch => ({
    setUri: (uri) => dispatch(setUri(uri))
})

// or any pure javascript modules available in npm
class MyListItem extends React.PureComponent {
    onSwipeLeft(gestureState) {
        console.log('You swiped left')
    }

    render() {
        const shareDish = (title, message, url) => {
            Share.share({
                title: title,
                message: title + ': ' + message + ' ' + url,
                url: url
            },{
                dialogTitle: 'Share ' + title
            })
        }
        let newsLink = (newsfeed) => {
            var itemlink = ((typeof newsfeed.added!='undefined' && newsfeed.added == 'true') ? EXTRACTHOSTNAME(newsfeed.link) : GETHOSTNAME(newsfeed.link.split('url=')[1], newsfeed));
            return itemlink;
        }
        let item = this.props.item;
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 10
        };
        return (
            <GestureRecognizer
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                config={config}
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}
            >
            <View style={{ width: this.props.width, height: this.props.height}}  key={item.newsid}>
                <Image
                    source={{ uri: item.approved_image }}
                    style={{ height: 250 }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <View style={{ flexDirection: "row",
                    alignItems: 'center',
                    margin: 5,
                    justifyContent: 'flex-start'}}>
                    <Text h4>{item.approved_title}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center',
                    margin:5,
                    justifyContent: 'flex-start', }}>
                    <Text style={{color: "grey"}}>{`${TIMESINCE(item.date)} ago`}</Text>
                    <Icon
                        raised
                        reverse
                        name={ false ? 'bookmark' : 'bookmark-o'}
                        type='font-awesome'
                        color='#f50'
                        size={20}
                        onPress={() => console.log('Already favorite')}
                    />
                    <Icon
                        raised
                        reverse
                        name='share'
                        type='font-awesome'
                        color='#51D2A8'
                        size={20}
                        onPress={() => shareDish(item.approved_title, item.approved_description, `https://www.newsapp.io/${catArray[parseInt(item.category)]}/${item.newsid}`)} />
                </View>
                {/*<View style={{ flexDirection: "row",
                    alignItems: 'center',
                    margin: 5,
                    justifyContent: 'flex-start'}}>
                    <Text style={{color: "grey"}}>{`${TIMESINCE(item.date)} ago`}</Text>
                </View>*/}
                <View style={{ flexDirection: "row",
                    alignItems: 'center',
                    margin: 5,
                    justifyContent: 'flex-start'}}>
                    <Text>{item.approved_description}</Text>
                </View>
                {/*<View style={{ flexDirection: "row", alignItems: 'center',
                    justifyContent: 'flex-start', }}>
                    <Icon
                        raised
                        reverse
                        name={ false ? 'bookmark' : 'bookmark-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => console.log('Already favorite')}
                    />
                    <Icon
                        raised
                        reverse
                        name='share'
                        type='font-awesome'
                        color='#51D2A8'
                        onPress={() => shareDish(item.approved_title, item.approved_description, `https://www.newsapp.io/${catArray[parseInt(item.category)]}/${item.newsid}`)} />
                </View>*/}
                <View style={{ flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'flex-start'}}>
                    <Alias
                        title={`Swipe left to read more at ${newsLink(item)}`}
                        type="clear"
                        titleStyle={{
                            color: "grey",
                            fontSize: 12
                        }}
                    />
                </View>
            </View>
            </GestureRecognizer>
        )
    }
}

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: width,
            height: height,
            data: [],
            page: 1,
            count: 1,
            inProgressNetworkReq: false
        };
    }

    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        if(this.props.category==0){
            this.fetchMoreData();
        }
    }

    componentDidMount () {
        this.props.navigation.addListener('willFocus', (route) => {
            this.fetchMoreData();
        });
    }

    async fetchMoreData() {
        if (!this.state.inProgressNetworkReq) {
            //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
            //more than once
            this.setState({
                inProgressNetworkReq : true
            });
            const data = await DataCall.get(this.state.count, 0, 9);
            this.setState({
                data: this.state.data.concat(data),
                count: this.state.count + 1,
                inProgressNetworkReq : false
            });
        }
    }

    onLayout = event => {
        let {width, height} = event.nativeEvent.layout
        this.setState({height: height})
    }

    _renderItem = ({item, index}) => (
        <MyListItem
            height={this.state.height}
            width={this.state.width}
            item={item}
            index={index}
            navigate={this.props.navigation.navigate}
        />
    );

    fetchResult = () => {
        this.fetchMoreData();
    }


    renderFooter = () => {
        if (this.state.inProgressNetworkReq==false) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        console.log("Visible items are", viewableItems[0].item);
        console.log("Visible link", viewableItems[0].key);
        this.props.setUri(viewableItems[0].key);
    }

    render() {
        if (!this.state.data || this.state.data.length==0) {
            return(
                <Loading />
            );
        }
        else{
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    onViewableItemsChanged={this.onViewableItemsChanged }
                    onLayout = {this.onLayout}
                    getItemLayout={(data, index) => (
                        {length: this.state.height, offset: this.state.height * index, index}
                    )}
                    pagingEnabled={true}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    initialNumToRender={3}
                    keyExtractor={item => item.link}
                    removeClippedSubviews={true}
                    onEndReached={this.fetchResult}
                    onEndReachedThreshold={5}
                    ListFooterComponent={this.renderFooter}
                    style={{ flex: 1, backgroundColor: "#f0f2f5" }}
                />
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
