import React from "react"
import { StyleSheet, Text, View, Image, Button, Platform } from "react-native"
import {Google} from "expo"

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: ""
        }
    }
    signIn = async () => {
        try {
            let result;
            if(Platform.OS === 'android'){
                result = await Google.logInAsync({
                    androidClientId:
                        "762764011407-500q22dk4v57g1q8t6uglf2um5290gnb.apps.googleusercontent.com",
                    //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
                    scopes: ["profile", "email"]
                })
            }
            else{
                result = await Google.logInAsync({
                    /*androidClientId:
                        "762764011407-500q22dk4v57g1q8t6uglf2um5290gnb.apps.googleusercontent.com",*/
                    iosClientId: "762764011407-500q22dk4v57g1q8t6uglf2um5290gnb.apps.googleusercontent.com",
                    scopes: ["profile", "email"]
                })
            }

            if (result.type === "success") {
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl
                })
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.signedIn ? (
                    <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
                ) : (
                    <LoginPage signIn={this.signIn} />
                )}
            </View>
        )
    }
}

const LoginPage = props => {
    return (
        <View>
            <Text style={styles.header}>Sign In With Google</Text>
            <Button title="Sign in with Google" onPress={() => props.signIn()} />
        </View>
    )
}

const LoggedInPage = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome:{props.name}</Text>
            <Image style={styles.image} source={{ uri: props.photoUrl }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 25
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
    }
})
