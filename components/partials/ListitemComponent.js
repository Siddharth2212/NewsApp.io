import React from 'react';
import {View, ActivityIndicator, Share} from 'react-native';
import { Button as Alias, Image, Text, Icon} from 'react-native-elements';
import { EXTRACTHOSTNAME } from "../../utils/extracthostname";
import { GETHOSTNAME } from "../../utils/gethostname";
import { TIMESINCE } from "../../utils/timesince";
import { connect } from "react-redux";
import { setUri } from "../../redux/ActionCreators";
import { WebBrowser } from 'expo';
let catArray = ['home', 'search-engine-optimization', 'search-engine-marketing', 'analytics', 'content-marketing', 'mobile', 'social-media-marketing', 'google-adwords', 'facebook', 'india-jobs', 'international-jobs', 'freelancing-jobs', 'artificial-intelligence', 'entrepreneurship', 'digital-marketing-tips', 'post', 'snapchat', 'instagram', 'twitter', 'whatsapp', 'youtube', 'cyber-security', 'technology-tips']


const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

const mapDispatchToProps = dispatch => ({
    setUri: (uri) => dispatch(setUri(uri))
})

const shareDish = (title, message, url) => {
    Share.share({
        title: title,
        message: title + ': ' + message + ' ' + url,
        url: url
    },{
        dialogTitle: 'Share ' + title
    })
}

// or any pure javascript modules available in npm
class MyListItem extends React.PureComponent {
    state = {
        result: null,
    };

    _handlePressButtonAsync = async (link) => {
        let result = await WebBrowser.openBrowserAsync(link);
        this.setState({ result });
    };

    render() {
        let newsLink = (newsfeed) => {
            var itemlink = ((typeof newsfeed.added!='undefined' && newsfeed.added == 'true') ? EXTRACTHOSTNAME(newsfeed.link) : GETHOSTNAME(newsfeed.link.split('url=')[1], newsfeed));
            return itemlink;
        }
        let item = this.props.item;
        return (
            <View style={{ width: this.props.width, height: this.props.height}}  key={item.newsid}>
                <Image
                    source={{ uri: item.approved_image }}
                    style={{ height: 180 }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <View style={{ flexDirection: "row",
                    alignItems: 'center',
                    margin: 5,
                    justifyContent: 'flex-start'}}>
                    <Text h4>{item.approved_title}</Text>
                </View>
                <View style={{ flexDirection: "row",
                    alignItems: 'center',
                    margin: 5,
                    justifyContent: 'flex-start'}}>
                    <Text style={{color: "grey"}}>{`${TIMESINCE(item.date)} ago`}</Text>
                </View>
                <View style={{ flexDirection: "row",
                    alignItems: 'center',
                    margin: 5,
                    justifyContent: 'flex-start'}}>
                    <Text>{item.approved_description}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center',
                    justifyContent: 'flex-start', }}>
                    <Icon
                        raised
                        reverse
                        name={ false ? 'bookmark' : 'bookmark-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => console.log('Already favorite')}
                    />
                    <Icon
                        raised
                        reverse
                        name='share'
                        type='font-awesome'
                        color='#51D2A8'
                        onPress={() => shareDish(item.approved_title, item.approved_description, `https://www.newsapp.io/${catArray[parseInt(item.category)]}/${item.newsid}`)} />
                </View>
                <View style={{ flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'flex-start'}}>
                    <Alias
                        onPress={() => this._handlePressButtonAsync(item.link)}
                        title={`Read more at ${newsLink(item)}`}
                        type="clear"
                        titleStyle={{
                            color: "#2196f3",
                            fontSize: 12
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyListItem);
