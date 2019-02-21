import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Clipboard,
    Button,
    Image,
    ActivityIndicator,
    StatusBar,
} from 'react-native'
import { Header, SearchBar, SocialIcon } from 'react-native-elements';
import { connect } from "react-redux";
import {fetchDishes, setUri} from "../redux/ActionCreators";
import LinkedInModal from 'react-native-linkedin'
import {baseUrl} from "../shared/baseUrl";
var { width, height } = Dimensions.get('window');// You can import from local files
const CLIENT_ID = '81ubjdyk0k4ah7';
const CLIENT_SECRET = 'pEwYCZvVrh4sVkwh';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userContainer: {
        padding: 10,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 100,
        resizeMode: 'cover',
        marginBottom: 15,
    },
    item: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    label: {
        marginRight: 10,
    },
    value: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    linkedInContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    labelContainer: {
        flex: 0.7,
        alignItems: 'flex-end',
    },
    valueContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
})

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
            selectedIndex: 0,
            access_token: undefined,
            expires_in: undefined,
            refreshing: false,
            college_name: null,
            location: null
        };
        this.loaded = false;
        // StatusBar.setHidden(true)
    }

    componentDidMount(){
        setTimeout(function () {
            this.loaded = true
        }, 1000)
    }

    updateSearch = search => {
        this.setState({ search });
    };

    async getUser({ access_token }) {
        this.setState({ refreshing: true })
        const baseApi = 'https://api.linkedin.com/v1/people/'
        const qs = { format: 'json' }
        const params = [
            'first-name',
            'last-name',
            'picture-urls::(original)',
            'headline',
            'email-address',
            'num-connections',
            'num-connections-capped',
            'location'
        ]

        const response = await fetch(`${baseApi}~:(${params.join(',')})?format=json`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
        })
        let payload = await response.json()

        const userinfo = await fetch('https://www.newsapp.io/userdata?email='+payload.emailAddress+'');

        const userinfodata = await userinfo.json();

        if(!userinfodata.error && userinfodata.college_name){
            payload.college_name = userinfodata.college_name
            payload.linkedinshares = userinfodata.linkedinshares
            payload.twittershares = userinfodata.twittershares
        }
        else{
            payload.college_name = 'NA'
            payload.linkedinshares = 0
            payload.twittershares = 0
        }

        this.setState({ ...payload, refreshing: false })
    }

    renderItem(label, value) {
        return (
            <View style={styles.item}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>{label}</Text>
                </View>
                <Text>👉</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{value}</Text>
                </View>
            </View>
        )
    }


    render() {
        const { emailAddress, pictureUrls, refreshing, firstName, lastName, headline, college_name, location, numConnections, linkedinshares, twittershares } = this.state

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
                {!emailAddress &&
                !refreshing && (
                    <View style={styles.linkedInContainer}>
                        <LinkedInModal
                            ref={ref => {
                                this.modal = ref
                            }}
                            clientID={CLIENT_ID}
                            clientSecret={CLIENT_SECRET}
                            redirectUri="https://xaviercarpentier.com"
                            onSuccess={data => this.getUser(data)}
                            linkText={null}
                        />
                        <SocialIcon
                            title='Sign in With LinkedIn'
                            button
                            type='linkedin'
                            onPress={() => this.modal.open()}
                        />
                    </View>
                )}

                {refreshing && <ActivityIndicator size="large" />}

                {emailAddress && (
                    <View style={styles.userContainer}>
                        <Image style={styles.picture} source={{ uri: pictureUrls.values[0] }} />
                        {this.renderItem('Email', emailAddress)}
                        {this.renderItem('Name', firstName+" "+lastName)}
                        {this.renderItem('No of connections', numConnections)}
                        {/*{this.renderItem('LinkedIn Shares', linkedinshares)}
                        {this.renderItem('Twitter Shares', twittershares)}*/}
                        {/*{this.renderItem('Headline', headline)}*/}
                        {this.renderItem('College name', college_name)}
                        {this.renderItem('Location', location.name)}
                    </View>
                )}
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
