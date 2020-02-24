import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';

export default class Resort extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    static navigationOptions = {
        headerTransparent: true,
        headerTintColor: 'white',
        title: '',
    }

    render() {
        const { Url } = this.props.navigation.state.params
        return (
            <WebView
                source={{ uri: Url }}
                style={{ marginTop: 0 }}
            />
        );
    }
}
