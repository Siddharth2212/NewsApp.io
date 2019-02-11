import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import { Icon } from "react-native-elements";
import Favorites from "./FavoriteComponent";
import Dishdetail from "./DishdetailComponent";
import News from "./HomeComponent";
import { DrawerItems, SafeAreaView, createDrawerNavigator, createAppContainer, createStackNavigator} from 'react-navigation';


const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#2196f3',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        width: 200,
        height: 60,
        marginLeft:10
    }
});

const FavoritesNavigator = createStackNavigator({
        Favorites: { screen: Favorites,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon name="menu" size={24}
                                  color= 'white'
                                  onPress={ () => navigation.toggleDrawer() } />,
                headerStyle: {
                    backgroundColor: "#2196f3"
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: "#fff"
                }
            })
        },
        Dishdetail: { screen: Dishdetail,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: "#2196f3"
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
    },
    {
        initialRouteName: 'Favorites'
    }
);

const NewsNavigator = createStackNavigator({
        Home: { screen: News,
            headerMode: 'none',
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon name="home" size={24}
                                  color= 'white'
                                  onPress={ () => navigation.toggleDrawer() } />,
                headerStyle: {
                    backgroundColor: "#2196f3"
                },
                headerVisible: false,
            })
        },
        Dishdetail: { screen: Dishdetail,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: "#2196f3"
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    }
);

const MainNavigator = createDrawerNavigator({
    Home:
        { screen: NewsNavigator,
            navigationOptions: {
                title: 'Home',
                drawerLabel: 'Home',
                drawerLockMode: "locked-closed",
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={22}
                        color={tintColor}
                    />
                )
            }
        },
    Favorites:
        { screen: FavoritesNavigator,
            navigationOptions: {
                title: 'My Favorites',
                drawerLabel: 'My Favorites',
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='heart'
                        type='font-awesome'
                        size={24}
                        iconStyle={{ color: tintColor }}
                    />
                ),
            }
        }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
});

export default createAppContainer(MainNavigator);
