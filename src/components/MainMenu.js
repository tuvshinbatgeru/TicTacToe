import React, { PropTypes, Component } from 'react'
import { 
	StyleSheet,
	View, 
	Text,
	TouchableOpacity,
    BackAndroid,
    Image
} from 'react-native'

export default class MainMenu extends Component {
  
  render () {
    return (
      
        <View style={styles.container}>
            <Image source={require('../assets/background.jpg')} style={{ width: null, height: null, flex: 1,}}>
            	<View style={styles.menuContainer}>
            		<TouchableOpacity style={[styles.btn, { marginBottom: 20,}]} onPress={() => this.props.onChangeStage(1)}> 
            			<Text style={styles.btnText}>PLAY</Text>
            		</TouchableOpacity>
            		<TouchableOpacity style={styles.btn} onPress={() => BackAndroid.exitApp()}>
            			<Text style={styles.btnText}>QUIT</Text>
            		</TouchableOpacity>
            	</View>
            </Image>
        </View>
    )
  }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover'
    },

    menuContainer: {
    	/*position: 'absolute',
    	top: 100,*/
        //height: 100,
        flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    },

    btn: {
        //flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: 200,
    	borderWidth: 3,
    	borderColor: "#ff3165",
    	justifyContent: 'center',
    	alignItems: 'center',
        //backgroundColor: 'rgba(0,0,0,0.3)'
    },

    btnText: {
    	fontSize: 24,
    	color: "#ff3165",
        fontWeight: '800',
    }
})
