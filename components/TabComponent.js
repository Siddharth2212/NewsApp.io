import React, { Component } from 'react';
import { Text, Button, View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
var {width, height} = Dimensions.get('window');// You can import from local files
import { Loading } from './LoadingComponent';
import { Card, Icon, Button as Alias } from 'react-native-elements';
import {DataCall} from "../utils/DataCall";
import {EXTRACTHOSTNAME} from "../utils/extracthostname";
import {GETHOSTNAME} from "../utils/gethostname";
import {TIMESINCE} from "../utils/timesince";


// or any pure javascript modules available in npm
class MyListItem extends React.PureComponent {
    render() {
        let newsLink = (newsfeed) => {
            var itemlink = ((typeof newsfeed.added!='undefined' && newsfeed.added == 'true') ? EXTRACTHOSTNAME(newsfeed.link) : GETHOSTNAME(newsfeed.link.split('url=')[1], newsfeed));
            return itemlink;
        }
        let item = this.props.item;
        return (
            <View style={{ width: this.props.width, height: this.props.height}}  key={item.newsid}>
                <Card
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
                    {/*<View
                        style={{
                            paddingVertical: 20,
                            borderTopWidth: 1,
                            borderColor: "#CED0CE"
                        }}
                    ><ActivityIndicator animating size="large" />
                    </View>*/}
                </Card>
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
            const data = await DataCall.get(this.state.count, this.props.category, 9);
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

    render() {
        if (!this.state.data || this.state.data.length==0) {
            return(
                <Loading />
            );
        }
        else{
            return (
                <FlatList
                    onLayout = {this.onLayout}
                    getItemLayout={(data, index) => (
                        {length: this.state.height, offset: this.state.heigh * index, index}
                    )}
                    pagingEnabled={true}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    initialNumToRender={3}
                    keyExtractor={item => item.newsid.toString()}
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

export default Tab
