import React, {Component} from "react";
import {StyleSheet, Text, View, Image} from "react-native";

export default class LoadingHome extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View >
                    <Image
                        style={styles.logoApp}
                        source={require('../../images/logo-app.png')}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#081830',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerContainer: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontFamily: "Roboto"
    },

    logoApp: {
        width : 428,
        height : 397,
        bottom : 50
    }

});