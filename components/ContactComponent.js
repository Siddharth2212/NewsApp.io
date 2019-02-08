import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['info@ampdigitalnet.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {
        return(
            <View>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card
                        title="Contact Information">
                        <Text
                            style={{margin: 10}}>
                            {`AMP Digital, Unit Number 221, \nJMD Megapolis,  \nSector 48, \nSohna Road, Gurugram, \nHaryana 122018`}
                        </Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: "#2196f3"}}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                            onPress={this.sendMail}
                        />
                    </Card>
                </Animatable.View>
            </View>
        );
    }
}

export default Contact;
