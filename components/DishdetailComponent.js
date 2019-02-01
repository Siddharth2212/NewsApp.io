import React, {Component} from 'react';
import { Text, View, ScrollView, StyleSheet, FlatList, Modal, Alert, PanResponder, Share, Dimensions, Button as Btn  } from 'react-native';
import { Card, Icon, Rating, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {postComment, postFavorite} from "../redux/ActionCreators";
import * as Animatable from 'react-native-animatable';
import HTML from 'react-native-render-html';
import { Constants, WebBrowser } from 'expo';
import {EXTRACTHOSTNAME} from "../utils/extracthostname";
import {GETHOSTNAME} from "../utils/gethostname";

let catArray = ['home', 'search-engine-optimization', 'search-engine-marketing', 'analytics', 'content-marketing', 'mobile', 'social-media-marketing', 'google-adwords', 'facebook', 'india-jobs', 'international-jobs', 'freelancing-jobs', 'artificial-intelligence', 'entrepreneurship', 'digital-marketing-tips', 'post', 'snapchat', 'instagram', 'twitter', 'whatsapp', 'youtube', 'cyber-security', 'technology-tips']

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})


function RenderDish(props) {

    const dish = props.dish;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            // this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.approved_title + ' to favorite?',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            if(recognizeComment(gestureState)){
                props.toggleModal();
            }

            return true;
        }
    })

    handleViewRef = ref => this.view = ref;

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


    if (dish != null) {
        return(
            <ScrollView>
                {/*<Animatable.View ref={this.handleViewRef} animation="fadeInDown" duration={2000} delay={1000}  {...panResponder.panHandlers}>*/}
                <Card
                    featuredTitle={dish.approved_title}
                    image={{uri: dish.approved_image}}>
                    <HTML html={dish.longapproved_description} imagesMaxWidth={Dimensions.get('window').width} />
                    <View style={{ flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: 'flex-start'}}>
                        <Button
                            onPress={() => props._handlePressButtonAsync()}
                            title={`Read more at ${newsLink(dish)}`}
                            clear
                            titleStyle={{
                                color: "#2196f3"
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center',
                        justifyContent: 'center', }}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.toggleModal()}
                        />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            style={styles.cardItem}
                            onPress={() => shareDish(dish.approved_title, dish.approved_description, `https://www.newsapp.io/${catArray[parseInt(dish.category)]}/${dish.newsid}`)} />
                    </View>
                </Card>
                {/*</Animatable.View>*/}
            </ScrollView>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                    showRating={false}
                    startingValue={item.rating}
                    imageSize={20}
                    style={{ flexDirection: 'row', display: 'flex', flex: 1, justifyContent: 'flex-start', paddingVertical: 10 }}
                />
                {/*<Text style={{fontSize: 12}}>{item.rating} Stars</Text>*/}
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    if(comments.length>0){
        return (
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                <Card title='Comments' >
                    <FlatList
                        data={comments}
                        renderItem={renderCommentItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </Animatable.View>
        );
    }
    else{
        return(
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                <Card title='Comments' >
                    <Text style={{textAlign:'center'}}>
                        Be the first one to comment.
                    </Text>
                </Card>
            </Animatable.View>
        )
    }
}

class Dishdetail extends Component{
    constructor(props){
        super(props);

        this.state = {
            showModal : false,
            author: '',
            comment: '',
            rating: 3,
            result: null
        }
    }

    _handlePressButtonAsync = async (link) => {
        let result = await WebBrowser.openBrowserAsync(link);
        this.setState({ result });
    };

    static navigationOptions = {
        title : 'News Details'
    };

    handleComment() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        let dishId = this.props.navigation.getParam('dishId', '');
        this.addComment(dishId, this.state.rating, this.state.author, this.state.comment)
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    addComment(dishId, rating, author, comment) {
        this.props.postComment(dishId, rating, author, comment);
    }

    render(){
        const dish = this.props.navigation.getParam('dish', '');
        console.log('te dish');
        console.log(dish);
        let dishId = dish.newsid;

        return(
            <ScrollView>
                <RenderDish dish={dish}
                            favorite={this.props.favorites.favorites.some(el => el.newsid === dishId)}
                            toggleModal={() => this.toggleModal()}
                            _handlePressButtonAsync={() => this._handlePressButtonAsync(dish.link)}
                            onPress={() => this.markFavorite(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                       visible = {this.state.showModal}
                       onDismiss = {() => this.toggleModal() }
                       onRequestClose = {() => this.toggleModal() }>
                    <Rating
                        showRating
                        onFinishRating = {(rating) => this.setState({rating: rating})}
                        style={{ paddingVertical: 10 }}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        onChangeText={(value) => this.setState({author: value})}
                    />
                    <Input
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        onChangeText={(value) => this.setState({comment: value})}
                    />
                    <Btn
                        onPress = {() =>{this.toggleModal(); this.handleComment();}}
                        color="#512DA8"
                        title="Submit"
                    />
                    <Btn
                        onPress = {() =>{this.toggleModal();}}
                        color="#d9534f"
                        title="Cancel"
                    />
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
