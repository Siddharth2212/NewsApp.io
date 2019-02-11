import React, { Component } from 'react';
import {Button, View, Dimensions, FlatList, ActivityIndicator} from 'react-native';
var {width, height} = Dimensions.get('window');// You can import from local files
import { Loading } from './LoadingComponent';
import { Card, Icon, Button as Alias, Image, Text} from 'react-native-elements';
import {DataCall} from "../utils/DataCall";
import {EXTRACTHOSTNAME} from "../utils/extracthostname";
import {GETHOSTNAME} from "../utils/gethostname";
import {TIMESINCE} from "../utils/timesince";
import {connect} from "react-redux";
import {setUri} from "../redux/ActionCreators";
import { Constants, WebBrowser } from 'expo';


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
    state = {
        result: null,
    };

    _handlePressButtonAsync = async (link) => {
        let result = await WebBrowser.openBrowserAsync(link);
        this.setState({ result });
    };

    render() {
        let newsLink = (newsfeed) => {
            var itemlink = ((typeof newsfeed.added!='undefined' && newsfeed.added == 'true') ? EXTRACTHOSTNAME(newsfeed.link) : GETHOSTNAME(newsfeed.link.split('url=')[1], newsfeed));
            return itemlink;
        }
        let item = this.props.item;
        return (
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
                    <Text h3>{item.approved_title}</Text>
                </View>
                <View style={{ flexDirection: "row",
                    alignItems: 'center',
                    margin: 5,
                    justifyContent: 'flex-start'}}>
                    <Text style={{color: "grey"}}>{`${TIMESINCE(item.date)} ago`}</Text>
                </View>
                <View style={{ flexDirection: "row",
                    alignItems: 'center',
                    margin: 5,
                    justifyContent: 'flex-start'}}>
                    <Text>{item.approved_description}</Text>
                </View>
                <View style={{ flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'flex-start'}}>
                    <Alias
                        onPress={() => this._handlePressButtonAsync(item.link)}
                        title={`Read more at ${newsLink(item)}`}
                        type="clear"
                        titleStyle={{
                            color: "#2196f3",
                            fontSize: 12
                        }}
                    />
                </View>
               {/* <Button
                    containerViewStyle={{marginLeft:30,marginRight:30,width:"100%"}}
                    buttonStyle={{width:"100%"}}
                    textStyle={{}}
                    onPress={() => this.props.navigate('Dishdetail', { dish: item })}
                    title="Read More"
                    clear
                />*/}
                {/*<View style={{ flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'flex-start'}}>
                    <Alias
                        onPress={() => this.props.navigate('Dishdetail', { dish: item })}
                        title={`Read more`}
                        type="clear"
                        titleStyle={{
                            color: "#2196f3",
                            fontSize: 16
                        }}
                    />
                </View>*/}
                {/*<Card
                    containerStyle={{height: this.props.height-10}}
                    title={item.approved_title}
                    image={{ uri: item.approved_image }}>
                    <View style={{ flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: 'flex-start'}}>
                        <Alias
                            onPress={() => (console.log('hello'))}
                            title={`${TIMESINCE(item.date)} ago by ${newsLink(item)}`}
                            type="clear"
                            titleStyle={{
                                color: "#2196f3"
                            }}
                        />
                    </View>
                    <Text
                        style={{margin: 10}}>
                        {item.approved_description}
                    </Text>
                    <Button
                        title="Read more"
                        buttonStyle={{backgroundColor: "#2196f3"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={() => this.props.navigate('Dishdetail', { dish: item })}
                    />
                    <View
                        style={{
                            paddingVertical: 20,
                            borderTopWidth: 1,
                            borderColor: "#CED0CE"
                        }}
                    ><ActivityIndicator animating size="large" />
                    </View>
                </Card>*/}
            </View>
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
                <View style={{width: this.props.width}}>
                    <Loading />
                </View>
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
