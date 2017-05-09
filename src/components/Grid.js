import React, { PropTypes, Component } from 'react'
import { 
	StyleSheet,
	View, 
	Text,
	Image,
	TouchableOpacity
} from 'react-native'

export default class Grid extends Component {
  constructor(props) {
    super(props)
    this._renderShape = this._renderShape.bind(this)
    this._renderEnabled = this._renderEnabled.bind(this)
    this._renderDisabled = this._renderDisabled.bind(this)
  }

  _renderShape(value) {
  	 //alert(value)
  	 switch(value) {
  	 	case 1:
  	 		return <Image source={require('../assets/x.png')} 
  	 			   		  style={styles.image} 
  	 	    	   />
  	 	case 2:
  	 		return <Image source={require('../assets/o.png')} 
  	 			   		  style={styles.image} 
  	 	    	   />
  	 	default:
  	 		return
  	 }
  }

  _renderEnabled() {
  	let {
  		x,
  		y,
  		size
  	} = this.props

  	return (
  		<TouchableOpacity style={[styles.container, {height: size, width: size}]}
	      				  onPress={() => this.props.onGridPressed(x, y)}>
		 	
        </TouchableOpacity>
  	)
  }

  _renderDisabled() {
  	let {
  		size,
  		value,
  	} = this.props

  	return (
  		<View style={[styles.container, {height: size, width: size}]}>
		 	{ this._renderShape(value) }
        </View>
  	)	
  }

  render () {
  	let {
  		value,
  	} = this.props

    return (
      value == 0 ? this._renderEnabled() : this._renderDisabled()	
    )
  }
}

Grid.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	size: PropTypes.number,
	value: PropTypes.number,
},

Grid.defaultProps = {
	value: 0,
	size: 50,
}

let styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#b5b5b5',
        padding: 10,
    },

    image: {
    	width: null,
    	height: null,
    	flex: 1,
    }
})
