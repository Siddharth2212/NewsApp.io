import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator, AsyncStorage, Platform, Alert
} from 'react-native'
import { Header, SearchBar, SocialIcon, Button, Icon } from 'react-native-elements';
import { connect } from "react-redux";
import {authenticate, fetchDishes, fetchFavorites, getUser, setUri, signIn} from "../redux/ActionCreators";
import LinkedInModal from 'react-native-linkedin'
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
    header: {
        fontSize: 25
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
    }
})

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        userinfo: state.userinfo
    }
}

const mapDispatchToProps = dispatch => ({
    setUri: (uri) => dispatch(setUri(uri)),
    authenticate: (actiontype) => dispatch(authenticate(actiontype)),
    getUser: (data) => dispatch(getUser(data)),
    fetchFavorites: (email) => dispatch(fetchFavorites(email)),
    fetchDishes: (category, size, searchString) => dispatch(fetchDishes(category, size, searchString))
})

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    componentDidMount(){
        if(this.props.userinfo.isLoading){
            this.props.authenticate('signout');
        }
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('signedintoken');
            if (value !== null) {
                // We have data!!
                this.props.getUser({access_token: value});
            }

        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    }

    updateSearch = search => {
        this.setState({ search });
    };

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
                            this.props.navigation.navigate('Favorites')
                        } }}
                    clearIcon = {{type: 'font-awesome', color: '#86939e', name: 'search', onPress: (search2) => {
                            this.props.fetchDishes(-1, 20, search);
                            this.props.navigation.navigate('Search', {searchString: search})
                        }  }}
                    round={true}/>
                <Button
                    title="Tap to view Favorites"
                    type="outline"
                    onPress={() => {
                        console.log('hello');
                        if((this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.signedInLinkedin) || (this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.signedIn)){
                            console.log('logged in');
                            (this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.signedIn ? this.props.fetchFavorites(this.props.userinfo.userinfo.email):  this.props.fetchFavorites(this.props.userinfo.userinfo.emailAddress))
                            this.props.navigation.navigate('Favorites')
                        }
                        else{
                            Alert.alert(
                                'You are Not Logged in',
                                'Login to Save Favorites',
                                [
                                    {
                                        text: 'Login',
                                        onPress: () => this.modal.open()
                                    },
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Not logged in'),
                                        style: ' cancel'
                                    }
                                ],
                                { cancelable: false }
                            );
                        }
                    }}
                />
                {!(this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.signedIn) && !(this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.signedInLinkedin) &&
                !this.props.userinfo.isLoading && (
                    <View style={styles.linkedInContainer}>
                        <LinkedInModal
                            ref={ref => {
                                this.modal = ref
                            }}
                            clientID={CLIENT_ID}
                            clientSecret={CLIENT_SECRET}
                            redirectUri="https://xaviercarpentier.com"
                            onSuccess={data => {
                                return this.props.getUser(data);
                            }}
                            linkText={null}
                        />
                        <SocialIcon
                            title='Sign in With LinkedIn'
                            button
                            type='linkedin'
                            onPress={() => this.modal.open()}
                        />
                        {/*<SocialIcon
                            title='Sign in With Google'
                            button
                            type='google-plus-official'
                            onPress={() => this.props.authenticate('signin')}
                        />*/}
                    </View>
                )}

                {this.props.userinfo.isLoading && <ActivityIndicator size="large" />}

                {this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.signedInLinkedin && (
                    <View style={styles.userContainer}>
                        <Image style={styles.picture} source={{ uri: this.props.userinfo.userinfo.pictureUrls.values[0] }} />
                        {this.renderItem('Email', this.props.userinfo.userinfo.emailAddress)}
                        {this.renderItem('Name', this.props.userinfo.userinfo.firstName+" "+this.props.userinfo.userinfo.lastName)}
                        {this.renderItem('No of connections', this.props.userinfo.userinfo.numConnections)}
                        {/*{this.renderItem('LinkedIn Shares', linkedinshares)}
                        {this.renderItem('Twitter Shares', twittershares)}*/}
                        {/*{this.renderItem('Headline', headline)}*/}
                        {this.renderItem('College name', this.props.userinfo.userinfo.college_name)}
                        {this.renderItem('Location', this.props.userinfo.userinfo.location.name)}
                        <Button
                            icon={
                                <Icon
                                    type="font-awesome"
                                    name="sign-out"
                                    size={15}
                                    color="white"
                                />
                            }
                            onPress={async () => {
                                this.props.authenticate('signout');
                            }}
                            title="Sign-out"
                        />
                    </View>
                )}

                <View style={styles.userContainer}>
                    {this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.signedIn ? (
                        <View style={styles.userContainer}>
                            <Image style={styles.picture} source={{ uri: this.props.userinfo.userinfo.photoUrl }} />
                            {this.renderItem('Email', this.props.userinfo.userinfo.email)}
                            {this.renderItem('Name', this.props.userinfo.userinfo.name)}
                            <Button
                                icon={
                                    <Icon
                                        type="font-awesome"
                                        name="sign-out"
                                        size={15}
                                        color="white"
                                    />
                                }
                                onPress={async () => {
                                    this.props.authenticate('signout');
                                }}
                                title="Sign-out"
                            />
                        </View>
                    ) : (
                        <Text></Text>
                    )}
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
