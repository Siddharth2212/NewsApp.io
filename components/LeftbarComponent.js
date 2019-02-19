import React, { Component } from 'react';
import { View, Dimensions} from 'react-native';
var { width, height } = Dimensions.get('window');// You can import from local files
import { Header, SearchBar, Button, Icon } from 'react-native-elements';
import { connect } from "react-redux";
import {fetchDishes, setUri} from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

const mapDispatchToProps = dispatch => ({
    setUri: (uri) => dispatch(setUri(uri)),
    fetchDishes: (category, size, searchString) => dispatch(fetchDishes(category, size, searchString))
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
            search: '',
            selectedIndex: 0
        };
        this.loaded = false;
    }

    componentDidMount(){
        setTimeout(function () {
            this.loaded = true
        }, 1000)
    }

    updateSearch = search => {
        this.setState({ search });
    };

    navigateToLogin(){
        console.log('HERE');
        this.props.navigation.navigate('Dishdetail');
    }


    render() {
        const { search } = this.state;

        return(
            <View style={{flex:1, width: this.props.width, backgroundColor: '#fff'}}>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    barStyle="light-content" // or directly
                    rightComponent={{ icon: 'chevron-right', color: '#fff', onPress: () =>  this.props.swipe(1)}}
                    centerComponent={{ text: 'NewsApp.io', style: { color: '#fff' } }}
                    containerStyle={{
                        backgroundColor: '#2196f3',
                        justifyContent: 'space-around',
                    }}
                />
                <SearchBar
                    lightTheme
                    containerStyle={{marginTop:0}}
                    value={search}
                    onChangeText={this.updateSearch}
                    placeholder="Type to search..."
                    icon = {{type: 'font-awesome', color: '#86939e', name: 'search', onPress: () => {
                        console.log('HELLOOOOO');
                            this.props.navigation.navigate('Favorites')
                        } }}
                    clearIcon = {{type: 'font-awesome', color: '#86939e', name: 'search', onPress: (search) => {
                            console.log('HELLOOOOO');
                            console.log(this.state.search);
                            this.props.fetchDishes(-1, 20, 'SEO');
                            this.props.navigation.navigate('Search', {searchString: 'SEO'})
                        }  }}
                    round={true}/>
                {/*<Button
                    icon={
                        <Icon
                            type="font-awesome"
                            name="user"
                            size={15}
                            color="white"
                        />
                    }
                    iconRight
                    title="Button with right icon"
                    onPress={() => this.navigateToLogin()}
                />*/}
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
