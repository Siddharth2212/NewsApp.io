import React from 'react';
import { Image, Platform, View, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import {baseUrl} from "../shared/baseUrl";



const isIOS = Platform.OS === 'ios';

export class ImageRenderer extends React.Component {
    shouldComponentUpdate(newProps) {
        return this.props.imageUrl !== newProps.imageUrl;
    }
    componentWillUpdate() {
        //On iOS while recycling till the new image is loaded the old one remains visible. This forcefully hides the old image.
        //It is then made visible onLoad
        if (isIOS && this.imageRef) {
            this.imageRef.setNativeProps({
                opacity: 0,
            });
        }
    }
    handleOnLoad = () => {
        if (isIOS && this.imageRef) {
            this.imageRef.setNativeProps({
                opacity: 1,
            });
        }
    };
    render() {
        const {navigate} = this.props.navigation;

        return (
            <View
                style={{
                    flex: 1,
                    margin: 3,
                    backgroundColor: 'lightgrey',
                }}>
                <Tile
                    imageSrc={{ uri: this.props.imageUrl.approved_image}}
                    title={this.props.imageUrl.approved_title}
                    featured
                    caption={this.props.imageUrl.approved_title}
                    onPress={() => navigate('Dishdetail', { dish: this.props.imageUrl })}
                />
            </View>
        );
    }
}
