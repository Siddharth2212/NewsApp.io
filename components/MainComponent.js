import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, NetInfo, ToastAndroid } from 'react-native';
import { Icon } from "react-native-elements";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Favorites from "./FavoriteComponent";
import Dishdetail from "./DishdetailComponent";
import Cards from "./CardsComponent";
import { DrawerItems, SafeAreaView, createDrawerNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';


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

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#2196f3"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff",
            headerLeft: <Icon name="menu" size={24}
                              color= 'white'
                              onPress={ () => navigation.toggleDrawer() } />
        })}
});

const Tabs = createMaterialTopTabNavigator({
        Home: { screen: Cards,
            navigationOptions: {
                title: 'Home'
            }
        },
        SEO: { screen: Cards,
            navigationOptions: {
                title: 'SEO'
            }
        },
        SEM: { screen: Cards,
            navigationOptions: {
                title: 'SEM'
            }
        },
        Analytics: { screen: Cards,
            navigationOptions: {
                title: 'Analytics'
            }
        },
        Mobile: { screen: Cards,
            navigationOptions: {
                title: 'Mobile'
            }
        },
        "Content marketing": { screen: Cards,
            navigationOptions: {
                title: 'Content marketing'
            }
        },
        "Start Ups": { screen: Cards,
            navigationOptions: {
                title: 'Start  Ups'
            }
        },
        Facebook: { screen: Cards,
            navigationOptions: {
                title: 'Facebook'
            }
        },
        Snapchat: { screen: Cards,
            navigationOptions: {
                title: 'Snapchat'
            }
        },
        Instagram: { screen: Cards,
            navigationOptions: {
                title: 'Instagram'
            }
        },
        Youtube: { screen: Cards,
            navigationOptions: {
                title: 'Youtube'
            }
        },
        Whatsapp: { screen: Cards,
            navigationOptions: {
                title: 'Whatsapp'
            }
        },
        Twitter: { screen: Cards,
            navigationOptions: {
                title: 'Twitter'
            }
        },
        "Artificial Intelligence": { screen: Cards,
            navigationOptions: {
                title: 'Artificial Intelligence'
            }
        },
        "Cyber security": { screen: Cards,
            navigationOptions: {
                title: 'Cyber security'
            }
        },
        "Digital marketing tips": { screen: Cards,
            navigationOptions: {
                title: 'Digital marketing tips'
            }
        },
        "Technology tips": { screen: Cards,
            navigationOptions: {
                title: 'Technology tips'
            }
        }
    },
    {   swipeEnabled: true,
        lazy: false,
        animationEnabled: true,
        optimizationsEnabled: true,
        tabBarOptions: {
            activeBackgroundColor: '#9575CD',
            inactiveBackgroundColor: '#D1C4E9',
            activeTintColor: '#ffffff',
            inactiveTintColor: 'white',
            labelStyle: {
                fontSize: 12
            },
            tabStyle: {
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
            },
            style: {
                backgroundColor: '#64B5F6',
            },
            statusBarStyle: 'light-content',
            scrollEnabled: true,
        }
    });

const HomeNavigator = createStackNavigator({
        Home: { screen: Tabs,
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
        initialRouteName: 'Home'
    }
);

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

const AboutNavigator = createStackNavigator({
    About: { screen: About,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#2196f3"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff",
            headerLeft: <Icon name="menu" size={24}
                              color= 'white'
                              onPress={ () => navigation.toggleDrawer() } />
        })}
});

const MainNavigator = createDrawerNavigator({
    Home:
        { screen: HomeNavigator,
            navigationOptions: {
                title: 'Home',
                drawerLabel: 'Home',
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
    About:
        { screen: AboutNavigator,
            navigationOptions: {
                title: 'About Us',
                drawerLabel: 'About Us',
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
    Contact:
        { screen: ContactNavigator,
            navigationOptions: {
                title: 'Contact Us',
                drawerLabel: 'Contact Us',
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='address-card'
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
