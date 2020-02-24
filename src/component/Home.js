import React, { Component } from 'react';
import { RefreshControl, View, Text, StyleSheet, Image, Button, TouchableOpacity, BackHandler, Alert, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Loader from './Loader';

const screenHeight = Math.round(Dimensions.get('window').height);
const unsubscribe = NetInfo.addEventListener(state => {
	//console.log("Connection type", state.type);
	//console.log("Is connected?", state.isConnected);
});
unsubscribe();

const Toast = (props) => {
	if (props.visible) {
		ToastAndroid.showWithGravityAndOffset(
			props.message,
			ToastAndroid.LONG,
			ToastAndroid.CENTER,
			25,
			50,
		);
		return null;
	}
	return null;
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuPage: [],
			loading: false,
			btnBackup: true,
			refreshing: true,
			visibleToast: false,

		};
	}
	static navigationOptions = {
		headerTransparent: true,
		headerShown: false,
	}


	CheckConnectivity = () => {

		NetInfo.fetch().then(state => {
			//console.log("Connection type", state.type);
			//console.log("Is connected?", state.isConnected);

			if (state.isConnected == false) {
				this.setState({ visibleToast: true })
				//ToastAndroid.show('Check your Internet connection !', ToastAndroid.LONG)

			}
		});


	};



	componentDidMount() {
		this.CheckConnectivity();
		this.fetchData();
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress1);
	}

	componentWillUnmount() {
	}

	onBackPress1 = () => {
		return true;
	}

	onBackPress = () => {
		Alert.alert(
			'Exit App',
			'Do you want to exit?',
			[
				{ text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: 'Yes', onPress: () => BackHandler.exitApp() },
			],
			{ cancelable: false });
		return true;
	}

	_PageAdmin = (Url) => {
		this.setState({ loading: true, });
		if (Url == '') {
			setTimeout(() => {
				this.setState({ loading: false });
				Alert.alert('PAGE URL EMPTY !');
			}, 1500);
		} else {
			setTimeout(() => {
				this.setState({ loading: false });
				this.props.navigation.navigate('PageAdmin', { Url })
			}, 1500);
		}
	}

	_PageBackup = () => {
		this.setState({ loading: true, });
		ToastAndroid.show('Only For Developer', ToastAndroid.SHORT);
		setTimeout(() => {
			this.setState({ loading: false });
			this.props.navigation.navigate('PageBackup')
		}, 1500);

	}

	fetchData() {
		this.setState({ loading: true, btnBackup: false });
		fetch('https://portal.fi-tel.net/sitelist.asp')
			.then((response) => response.json())
			.then((responseJson) => {
				//Alert.alert(JSON.stringify(responseJson));
				this.setState({
					loading: false,
					btnBackup: true,
					menuPage: responseJson.portal,
					refreshing: false,
					visibleToast: false
				});
			})
			.catch((error) => {
				console.error(error);
				this.setState({ loading: false, refreshing: false, visibleToast: false });
			})
	}

	_renderMenu() {
		return this.state.menuPage.map((item, index) => {
			return (
				<TouchableOpacity style={styles.menu}
					key={index}
					onPress={() => { this._PageAdmin(item.Url) }}
				>
					<Image
						style={{ width: 50, height: 50 }}
						source={{ uri: 'https://portal.fi-tel.net/Icon/' + item.Icon }}
					/>
					<Text style={styles.txtMenu}>{item.NamaPortal}</Text>
				</TouchableOpacity>
			);
		});
	}

	onRefresh() {
		this.CheckConnectivity();
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
					<Text style={styles.txtHeader}>ADMIN PORTAL</Text>

				</View>
				<TouchableOpacity style={styles.closeHeader}
					onPress={() => { this.onBackPress() }}
				>
					<Text style={styles.txtClose}>X</Text>
				</TouchableOpacity>

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
						<View style={{ height: '88%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 80, }}>
							{
								this._renderMenu()
							}

							{
								this.state.btnBackup ?

									<TouchableOpacity style={styles.menu}
										onPress={() => { this._PageBackup() }}
									>
										<Image
											style={{ width: 50, height: 50 }}
											source={require('../icon/admin24.png')}
										/>
										<Text style={styles.txtMenu}>BACKUP</Text>
									</TouchableOpacity>


									: null
							}

						</View>
					</ScrollView>
					<Toast visible={this.state.visibleToast} message="Check your Internet connection !" />
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

export default Home;

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
	closeHeader: {
		height: 30,
		width: 30,
		backgroundColor: '#d97e7e',
		justifyContent: 'center',
		alignItems: 'center',
		top: 20,
		right: 20,
		marginLeft: 10,
		borderRadius: 15,
		position: 'absolute',
	},
	txtHeader: {
		fontWeight: 'bold',
		fontSize: 25,
		color: 'white',
		fontFamily: 'sans-serif-medium',
	},
	txtClose: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#252526',
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
		height: 93,
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
		top: 45,
	},
	txtCopyright: {
		fontFamily: 'sans-serif-condensed',
		color: 'white',
		fontSize: 8,
	},
})
