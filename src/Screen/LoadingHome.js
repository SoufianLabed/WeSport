import React, {Component} from "react";
import {StyleSheet, Text, View, Image} from "react-native";

export default class LoadingHome extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View >
                    <Image
                        style={styles.logoApp}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <Text style={styles.centerContainer}>HELLO HOME</Text>
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

    }

});