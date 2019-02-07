import React, { Component } from 'react';
import { Text, ScrollView, View, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import {LEADERS} from "../shared/leaders";
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


function History(props) {

    return(<Card
        title="Our History">
        <Text
            style={{margin: 10}}>
            {`NewsApp.io is a Global Media and Information Platform providing Latest News and Job Opportunities from all the fields related to Technology and Digital Marketing.`}
        </Text>
    </Card>);
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
        const renderMenuItem = ({item, index}) => {

            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: require('./images/amitabh.jpeg') }}
                />
            );
        };

        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <FlatList
                            data={LEADERS}
                            renderItem={renderMenuItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default About;
