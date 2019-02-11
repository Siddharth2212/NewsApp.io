import React, { Component } from 'react';
import { View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
var { width, height } = Dimensions.get('window');// You can import from local files
import { Loading } from './../LoadingComponent';
import { DataCall } from "../../utils/DataCall";
import { connect } from "react-redux";
import { setUri } from "../../redux/ActionCreators";
import MyListItem from "./ListitemComponent";


const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

const mapDispatchToProps = dispatch => ({
    setUri: (uri) => dispatch(setUri(uri))
})

// or any pure javascript modules available in npm
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
