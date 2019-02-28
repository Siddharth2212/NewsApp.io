import React from 'react';
import { Icon } from "react-native-elements";
import Favorites from "./FavoriteComponent";
import Dishdetail from "./DishdetailComponent";
import News from "./HomeComponent";
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import SearchComponent from "./SearchComponent";

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
            }},
        Search: { screen: SearchComponent,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: "#2196f3"
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: "#fff",
                    fontSize: 14
                }
            }},
        Favorites: { screen: Favorites,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: "#2196f3"
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: "#fff",
                    fontSize: 14
                }
            }}
    },
    {
        initialRouteName: 'Home'
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
        }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9'
});

export default createAppContainer(MainNavigator);
