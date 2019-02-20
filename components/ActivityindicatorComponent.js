import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
        marginLeft: 15,
        marginTop: 7,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

export const Activityindicator = (props) => {
    if(props.loading){
        return(
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="small" color="#00ff00" />
                <Text style={styles.loadingText} >{props.url}</Text>
            </View>
        );
    }
    else{
        return(
            <View style={[styles.container, styles.horizontal]}>
                {/*<ActivityIndicator size="small" color="#00ff00" />*/}
                <Text style={styles.loadingText} >{props.url}</Text>
            </View>
        );
    }
};
