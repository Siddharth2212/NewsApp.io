import React, { Component } from 'react';
import { Text, View, StyleSheet,
    Dimensions,
    Image,
    Animated,
    PanResponder} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import {fetchDishes, updatedDishes} from "../redux/ActionCreators";
import {EXTRACTHOSTNAME} from "../utils/extracthostname";
import {GETHOSTNAME} from "../utils/gethostname";
import {TIMESINCE} from "../utils/timesince";

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const mapStateToProps = state => {
    return {
        leaders: state.leaders,
        dishes: state.dishes
    }
}

const mapDispatchToProps = dispatch => ({
    updateDishes: () => dispatch(updatedDishes()),
    fetchDishes: (category) => dispatch(fetchDishes(category))
})

class Cards extends Component {


    constructor(props) {
        super(props)

        this.position = new Animated.ValueXY()
        this.swipedCardPosition = new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT })
        this.state = {
            currentIndex: 0
        }

    }

    componentWillMount() {

        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                if (gestureState.dy > 0 && (this.state.currentIndex > 0)) {
                    this.swipedCardPosition.setValue({
                        x: 0, y: -SCREEN_HEIGHT + gestureState.dy
                    })
                }
                else {

                    this.position.setValue({ y: gestureState.dy })

                }
            },
            onPanResponderRelease: (evt, gestureState) => {

                if (this.state.currentIndex > 0 && gestureState.dy > 20 && gestureState.vy > 0.2) {
                    Animated.timing(this.swipedCardPosition, {
                        toValue: ({ x: 0, y: 0 }),
                        duration: 400
                    }).start(() => {

                        this.setState({ currentIndex: this.state.currentIndex - 1 })
                        this.swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })

                    })
                }
                else if (-gestureState.dy > 20 && -gestureState.vy > 0.2) {

                    Animated.timing(this.position, {
                        toValue: ({ x: 0, y: -SCREEN_HEIGHT }),
                        duration: 400
                    }).start(() => {

                        this.setState({ currentIndex: this.state.currentIndex + 1 })
                        this.position.setValue({ x: 0, y: 0 })

                    })
                }
                else {
                    Animated.parallel([
                        Animated.spring(this.position, {
                            toValue: ({ x: 0, y: 0 })
                        }),
                        Animated.spring(this.swipedCardPosition, {
                            toValue: ({ x: 0, y: -SCREEN_HEIGHT })
                        })

                    ]).start()

                }
            }
        })

    }

    componentDidMount() {
        this.props.navigation.setParams({
            dishes: this.props.dishes,
            leaders: this.props.leaders,
            updateDishes: this.props.updateDishes,
            fetchDishes: this.props.fetchDishes
        })
    }

    renderArticles = (props) => {
        let newsLink = (newsfeed) => {
            var itemlink = ((typeof newsfeed.added!='undefined' && newsfeed.added == 'true') ? EXTRACTHOSTNAME(newsfeed.link) : GETHOSTNAME(newsfeed.link.split('url=')[1], newsfeed));
            return itemlink;
        }
        let dishes = props.dishes.dishes;

        return dishes.map((item, i) => {

            if (i == this.state.currentIndex - 1) {

                return (
                    <Animated.View key={item.newsid} style={this.swipedCardPosition.getLayout()}
                                   {...this.PanResponder.panHandlers}
                    >
                        <View style={{ flex: 1, width: SCREEN_WIDTH, backgroundColor: 'white' }}>

                            <View style={{ flex: 2, backgroundColor: 'black' }}>
                                <Image source={{uri: item.approved_image}}
                                       style={{ flex: 1, height: null, width: null, resizeMode: 'center' }}
                                ></Image>
                            </View>
                            <View style={{ flex: 3, padding: 5 }}>
                                <Text style={styles.titleText}>
                                    {item.approved_title}
                                </Text>
                                <Text style={styles.sourceText}>
                                    {`${TIMESINCE(item.date)} ago by ${newsLink(item)}`}
                                </Text>
                                <Text style={styles.baseText}>
                                    {item.approved_description}
                                </Text>
                                <View style={{ flexDirection: "row",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start'}}>
                                    <Button
                                        onPress={() => props.navigation.navigate('Dishdetail', { dishId: item.newsid })}
                                        color="#512DA8"
                                        title="Read more"
                                        clear
                                        titleStyle={{
                                            color: "#2196f3"
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                )
            }
            else if (i < this.state.currentIndex) {
                return null
            }
            if (i == this.state.currentIndex) {

                return (

                    <Animated.View key={item.newsid} style={this.position.getLayout()}
                                   {...this.PanResponder.panHandlers}
                    >
                        <View style={{ flex: 1, position: 'absolute', height: SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: 'white' }}>

                            <View style={{ flex: 2, backgroundColor: 'black' }}>
                                <Image source={{uri: item.approved_image}}
                                       style={{ flex: 1, height: null, width: null, resizeMode: 'center' }}
                                ></Image>
                            </View>
                            <View style={{ flex: 3, padding: 5 }}>
                                <Text style={styles.titleText}>
                                    {item.approved_title}
                                </Text>
                                <Text style={styles.sourceText}>
                                    {`${TIMESINCE(item.date)} ago by ${newsLink(item)}`}
                                </Text>
                                <Text style={styles.baseText}>
                                    {item.approved_description}
                                </Text>
                                <View style={{ flexDirection: "row",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start'}}>
                                    <Button
                                        onPress={() => props.navigation.navigate('Dishdetail', { dishId: item.newsid })}
                                        color="#512DA8"
                                        title="Read more"
                                        clear
                                        titleStyle={{
                                            color: "#2196f3"
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                )
            }
            else {

                return (
                    <Animated.View key={item.newsid}

                    >
                        <View style={{ flex: 1, position: 'absolute', height: SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: 'white' }}>

                            <View style={{ flex: 2, backgroundColor: 'black' }}>
                                <Image source={{uri: item.approved_image}}
                                       style={{ flex: 1, height: null, width: null, resizeMode: 'center' }}
                                ></Image>
                            </View>
                            <View style={{ flex: 3, padding: 5 }}>
                                <Text style={styles.titleText}>
                                    {item.approved_title}
                                </Text>
                                <Text style={styles.sourceText}>
                                    {`${TIMESINCE(item.date)} ago by ${newsLink(item)}`}
                                </Text>
                                <Text style={styles.baseText}>
                                    {item.approved_description}
                                </Text>
                                <View style={{ flexDirection: "row",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start'}}>
                                    <Button
                                        onPress={() => props.navigation.navigate('Dishdetail', { dishId: item.newsid })}
                                        color="#512DA8"
                                        title="Read more"
                                        clear
                                        titleStyle={{
                                            color: "#2196f3"
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                )

            }
        }).reverse()

    }

    render() {
        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>
                    <Text>{props.dishes.errMess}</Text>
                </View>
            );
        }
        else{
            return (
                <View style={{ flex: 1 }}>
                    {this.renderArticles(this.props)}
                </View>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sourceText:{
        color: 'grey'
    },
    baseText: {
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
