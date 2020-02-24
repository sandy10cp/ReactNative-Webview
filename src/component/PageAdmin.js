import React, { Component } from 'react';
import { View, Text, Image, BackHandler, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const top = 0;

export default class PageAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canGoBack: false
        };
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: '',
            headerTransparent: true,
            headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
            headerLeft: () =>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => navigation.navigate('Home')}>
                    <Image
                        style={{ width: 15, height: 15 }}
                        source={require('../icon/back.png')}
                    />
                </TouchableOpacity>
            ,
        };
    };


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }

    onBackButtonPressAndroid = () => {
        if (this.state.canGoBack) {
            this.webview.goBack();
            return true;
        } else {
            return false;
        }
    };

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack
        });
    }

    _refWebView = (webview) => {
        this.webview = webview;
    }

    render() {
        const { Url } = this.props.navigation.state.params
        return (
            <WebView
                ref={this._refWebView}
                source={{ uri: Url }}
                style={{ marginTop: 0 }}
                startInLoadingState={true}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create({
    btnBack: {
        backgroundColor: 'white',
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 8,
        top: top,
    },
})
