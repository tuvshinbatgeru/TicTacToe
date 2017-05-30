import React, { PropTypes, Component } from 'react'
import { 
	StyleSheet,
	View, 
	Text,
	Image,
	TouchableOpacity
} from 'react-native'

export default class GameControl extends Component {
  
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.rowCenter} onPress={this.props.onUpPress}>
        	<Image source={require('../assets/arrow.png')} 
		   		   style={[styles.image, {transform: [{rotate: '-90 deg'}]}]} 
    	    />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
        	<TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',}} onPress={this.props.onLeftPress}>
        		<Image source={require('../assets/arrow.png')} 
        			style={[styles.image, {transform: [{rotate: '-180 deg'}]}]}
		   		   
    	    	/>
        	</TouchableOpacity>
        	<TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',}} onPress={this.props.onRotatePress}>
        		<Image source={require('../assets/rotate.png')} 
		   		       style={styles.rotateImage} 
    	    	/>
        	</TouchableOpacity>
        	<TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',}} onPress={this.props.onRightPress}>
        		<Image source={require('../assets/arrow.png')} 
		   		   style={styles.image} 
    	    	/>
        	</TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.rowCenter} onPress={this.props.onBottomPress}>
        	<Image source={require('../assets/arrow.png')} 
		   		   style={[styles.image, {transform: [{rotate: '90 deg'}]}]}
    	    />
        </TouchableOpacity>
      </View>
    )
  }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    rowCenter: {
    	flexDirection: 'row',
    	justifyContent: 'center',
    	alignItems: 'center',
    },

    image: {
    	width: 60,
    	height: 60,
    	padding: 10,
    },

    rotateImage: {
    	width: 60,
    	height: 60,	
    }
})
