import React, { PropTypes, Component } from 'react'
import { 
	StyleSheet,
	View, 
	Text 
} from 'react-native'

const blockSize = 50

export default class Plane extends Component {
  constructor(props) {
    super(props)

    this._renderBody = this._renderBody.bind(this)
  }

  _renderGrid(x, y) {
  	return (
  		<View style={[styles.block, { top: y * blockSize, left: x * blockSize }]}/> 
  	)
  }

  _renderBody(heart, direction) {
	  let x = heart.x
  	  let y = heart.y	

	  if(direction == 0) {//UP 
		  return (
		  	 <View>
			  	 {this._renderGrid(x, y - 1)}
			  	 {this._renderGrid(x, y - 2)}
			  	 {this._renderGrid(x, y + 1)}
		  	 </View>
		  )  	  	
  	  }

  	  if(direction == 1) {//right
		  return (
		  	 <View>
			  	 {this._renderGrid(x - 1, y)}
			  	 {this._renderGrid(x + 1, y)}
			  	 {this._renderGrid(x + 2, y)}
		  	 </View>
		  )  	  	
  	  }

  	  if(direction == 2) {//bottom 
		  return (
		  	 <View>
			  	 {this._renderGrid(x, y - 1)}
			  	 {this._renderGrid(x, y + 1)}
			  	 {this._renderGrid(x, y + 2)}
		  	 </View>
		  )  	  	
  	  }

  	  if(direction == 3) {//left 
		  return (
		  	 <View>
			  	 {this._renderGrid(x - 1, y)}
			  	 {this._renderGrid(x + 1, y)}
			  	 {this._renderGrid(x - 2, y)}
		  	 </View>
		  )  	  	
  	  }
  } 

  render () {
  	let {
  		heart,
  		direction,
  	} = this.props

  	let x = heart.x
  	let y = heart.y

    return (
      <View style={styles.container}>

        { this._renderGrid(x, y) }
	  	{ this._renderGrid(x - 1, y - 1) }
	  	{ this._renderGrid(x + 1, y - 1) }
	  	{ this._renderGrid(x + 1, y + 1) }
	  	{ this._renderGrid(x - 1, y + 1) }
	  	{ this._renderBody(heart, direction) }

      </View>
    )
  }
}

Plane.propTypes = {
	heart: PropTypes.object,
	direction: PropTypes.number,
}

Plane.defaultProps = {
	heart: {
		x: 1,
		y: 2,
	},
	direction: 0,
}

let styles = StyleSheet.create({
    container: {
        height: blockSize * 5,
        width: blockSize * 5,
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    block: {
    	position: 'absolute',
    	zIndex: 2,
    	width: blockSize,
    	height: blockSize,
    	//backgroundColor: 'red',
    	borderWidth: 2,
    	borderColor: 'red',
    }
})
