import React, { Component } from 'react';
import { RefreshControl, View, Text, StyleSheet, Image, Button, TouchableOpacity, BackHandler, Alert, ScrollView, Dimensions } from 'react-native';
import Loader from './Loader';

const screenHeight = Math.round(Dimensions.get('window').height);

class PageBackup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuPage: [],
            loading: false,
            refreshing: true,
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
        this.fetchData();
    }

    componentWillUnmount() {
    }

    onBackPress = () => {
        return true;
    }

    _PageAdminBackup = (UrlBackup) => {
        this.setState({ loading: true, });
        setTimeout(() => {
            this.setState({ loading: false });
            this.props.navigation.navigate('PageAdminBackup', { UrlBackup })
        }, 1500);
    }



    fetchData() {
        fetch('https://portal.fi-tel.net/sitelist.asp')
            .then((response) => response.json())
            .then((responseJson) => {
                //Alert.alert(JSON.stringify(responseJson));
                this.setState({
                    menuPage: responseJson.portal,
                    refreshing: false,
                });
            })
            .catch((error) => {
                console.error(error);
            })
    }

    _renderMenu() {
        return this.state.menuPage.map((item, index) => {
            return (
                <TouchableOpacity style={styles.menu}
                    key={index}
                    onPress={() => { this._PageAdminBackup(item.UrlBackup) }}
                >
                    <Image
                        style={{ width: 50, height: 50, marginTop: 3, }}
                        source={{ uri: 'https://portal.fi-tel.net/Icon/' + item.Icon }}
                    />
                    <Text style={styles.txtMenu}>{item.NamaPortal}</Text>
                </TouchableOpacity>
            );
        });
    }

    onRefresh() {
        setTimeout(() => {
            this.setState({
                menuPage: [],
            })
            this.fetchData();
        }, 500);
    }



    render() {
        //Alert.alert(JSON.stringify(this.state.menuPage))
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.txtHeader}>ADMIN PORTAL BACKUP</Text>
                </View>
                <View style={styles.navigation}>
                    <ScrollView style={{ height: '88%', }}
                        refreshControl={
                            <RefreshControl
                                //refresh control used for the Pull to Refresh
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    >
                        <View style={{ height: '88%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 75, }}>

                            {
                                this._renderMenu()
                            }



                        </View>
                    </ScrollView>

                </View>
                <View style={styles.txtFooter}>
                    <Text style={styles.txtCopyright}>Copyright © 2020 EBMG IT Division</Text>
                </View>
                <Loader
                    loading={this.state.loading} />
            </View>
        );
    }
}

export default PageBackup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
    },
    header: {
        height: 87,
        backgroundColor: '#252526',
        paddingTop: 20,
        alignItems: 'center',
    },
    txtHeader: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'white',
        fontFamily: 'sans-serif-medium',
    },
    txtMenu: {
        textAlign: 'center',
        fontSize: 13,
        marginTop: 3,
        color: '#333',
        fontFamily: 'sans-serif-medium',
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 92,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 0,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 3,
        marginTop: 20,
    },
    navigation: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingBottom: 10,
        height: screenHeight,
        width: '100%',
        backgroundColor: '#eee',
        position: 'absolute',
        top: 70,
        borderTopLeftRadius: 20,
    },
    img: {
        marginTop: 1,
        width: 40,
        height: 40,
    },
    txtFooter: {
        width: '100%',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 43,
    },
    txtCopyright: {
        fontFamily: 'sans-serif-condensed',
        color: 'white',
        fontSize: 8,
    },
    btnBack: {
        backgroundColor: 'white',
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 6,
    },
})
