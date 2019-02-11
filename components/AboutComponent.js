import React, { Component } from 'react';
import { Text, ScrollView, View, FlatList } from 'react-native';
import { Card, ListItem, SearchBar } from 'react-native-elements';
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

    updateSearch = search => {
        this.setState({ search });
    };

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
        const { search } = this.state;

        return(
            <View>
                <SearchBar
                    lightTheme
                    containerStyle={{marginTop:20, backgroundColor: "#2196f3", borderColor:"#2196f3"}}
                    value={search}
                    onChangeText={this.updateSearch}
                    placeholder="Type to search..."
                    icon = {{type: 'font-awesome', color: '#86939e', name: 'search' }}
                    clearIcon = {{type: 'font-awesome', color: '#86939e', name: 'search' }}
                    round={true}/>
            </View>
        );
    }
}

export default About;
