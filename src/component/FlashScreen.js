import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';

export default class FlashScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        headerTransparent: true,
        title: '',
    }

    _GoToHome() {
        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this._GoToHome()
                }
                <Text style={styles.textStyles}>
                    AdminPortal
                </Text>
                <Text style={styles.txtCR}>Copyright © 2020 EBMG IT Division</Text>
                <ActivityIndicator
                    size="large"
                    color='#333333'
                    style={{ marginTop: 10 }} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyles: {
        color: '#333333',
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
    },
    txtCR: {
        fontFamily: 'sans-serif-condensed',
        color: '#333333',
        fontSize: 12,
    }
})
