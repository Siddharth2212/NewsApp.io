import React, { Component } from 'react';
import { View, Dimensions, FlatList, StyleSheet, BackHandler } from 'react-native';
var { width, height } = Dimensions.get('window');// You can import from local files
import { connect } from "react-redux";
import { setUri } from "../redux/ActionCreators";
import Leftbar from "./partials/LeftbarComponent";
import News from "./partials/NewsComponent";


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
            data2: [{
                newsid: "1",
                approved_title: "hello"
            }, {
                newsid: "2",
                approved_title: "hello2"
            }],
            page: 1,
            count: 1,
            inProgressNetworkReq: false
        };
    }

    static navigationOptions = {
        header: null
    };

    onLayout = event => {
        let {width, height} = event.nativeEvent.layout
        this.setState({height: height})
    }

    _renderItem = ({item, index}) => (
        (index==1)? <Leftbar navigation={this.props.navigation} flatListRef={this.flatListRef} scrollToItem={()=>this.scrollToItem} width={width}/> : <News navigation={this.props.navigation} width={width}/>
    );

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        console.log("Visible items are");
        console.log(viewableItems.length);
        let flatListRef = this.flatListRef;
        if(viewableItems.length==1){
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', function() {
                BackHandler.exitApp();
            });
        }
        else{
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', function() {
                flatListRef.scrollToIndex({animated: true, index: 0});
                return true;
            });
        }
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    scrollToIndex = () => {
        this.flatListRef.scrollToIndex({animated: true, index: 0});
    }

    scrollToItem = () => {
        this.flatListRef.scrollToIndex({animated: true, index: 1});
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    ref={(ref) => { this.flatListRef = ref; }}
                    inverted={true}
                    initialScrollIndex={0}
                    onViewableItemsChanged={this.onViewableItemsChanged }
                    onLayout = {this.onLayout}
                    getItemLayout={(data, index) => (
                        {length: this.state.height, offset: this.state.height * index, index}
                    )}
                    pagingEnabled={true}
                    horizontal
                    data={this.state.data2}
                    renderItem={this._renderItem}
                    initialNumToRender={2}
                    keyExtractor={item => item.newsid}
                    removeClippedSubviews={true}
                    style={{ flex: 1, backgroundColor: "#f0f2f5" }}
                />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingTop: 20,
        backgroundColor: 'darkturquoise',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Tab);
