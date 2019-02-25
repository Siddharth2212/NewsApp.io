import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, NetInfo, ToastAndroid } from 'react-native';
import { Icon } from "react-native-elements";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Favorites from "./FavoriteComponent";
import Dishdetail from "./DishdetailComponent";
import Tabs from "./TabsComponent";
import News from "./HomeComponent";
import { DrawerItems, SafeAreaView, createDrawerNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import SearchComponent from "./SearchComponent";


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

const TabNavigator = createMaterialTopTabNavigator({
        Home: { screen: Tabs,
            navigationOptions: {
                title: 'Home'
            }
        },
        SEO: { screen: Tabs,
            navigationOptions: {
                title: 'SEO'
            }
        },
        SEM: { screen: Tabs,
            navigationOptions: {
                title: 'SEM'
            }
        },
        Analytics: { screen: Tabs,
            navigationOptions: {
                title: 'Analytics'
            }
        },
        Mobile: { screen: Tabs,
            navigationOptions: {
                title: 'Mobile'
            }
        },
        "Content marketing": { screen: Tabs,
            navigationOptions: {
                title: 'Content marketing'
            }
        },
        "Start Ups": { screen: Tabs,
            navigationOptions: {
                title: 'Start  Ups'
            }
        },
        Facebook: { screen: Tabs,
            navigationOptions: {
                title: 'Facebook'
            }
        },
        Snapchat: { screen: Tabs,
            navigationOptions: {
                title: 'Snapchat'
            }
        },
        Instagram: { screen: Tabs,
            navigationOptions: {
                title: 'Instagram'
            }
        },
        Youtube: { screen: Tabs,
            navigationOptions: {
                title: 'Youtube'
            }
        },
        Whatsapp: { screen: Tabs,
            navigationOptions: {
                title: 'Whatsapp'
            }
        },
        Twitter: { screen: Tabs,
            navigationOptions: {
                title: 'Twitter'
            }
        },
        "Artificial Intelligence": { screen: Tabs,
            navigationOptions: {
                title: 'Artificial Intelligence'
            }
        },
        "Cyber security": { screen: Tabs,
            navigationOptions: {
                title: 'Cyber security'
            }
        },
        "Digital marketing tips": { screen: Tabs,
            navigationOptions: {
                title: 'Digital marketing tips'
            }
        },
        "Technology tips": { screen: Tabs,
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
        Home: { screen: TabNavigator,
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
            }}
    },
    {
        initialRouteName: 'Home'
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
