import React, { PropTypes, Component } from 'react'
import { 
	StyleSheet,
	View, 
	Text,
	TouchableOpacity,
  Dimensions
} from 'react-native'

import Grid from './Grid'
import GameControl from './GameControl'
import Plane from './Plane'

const blockSize = 50
const screen = Dimensions.get('window')

export default class Game extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
        board: [],
        playerTurn: true, //true == x, false == y
        gameResult: 0, //0 - inProgress, 1 - x, 2 - o, 3-draw 
        step: 0,
        heart: {
          x: 2,
          y: 2,
        },
        direction: 0,
    }

    this.onGridPressed = this.onGridPressed.bind(this)
    this._renderOverlay = this._renderOverlay.bind(this)
    this.gameWinCondition = this.gameWinCondition.bind(this)
    this.onPlayAgain = this.onPlayAgain.bind(this)
    
    this.onLeftPress = this.onLeftPress.bind(this)
    this.onRightPress = this.onRightPress.bind(this)
    this.onBottomPress = this.onBottomPress.bind(this)
    this.onUpPress = this.onUpPress.bind(this)
    this.onRotatePress = this.onRotatePress.bind(this)
  }

  componentWillMount() {
    this.onPlayAgain()
  }

  onLeftPress() {
    let {
      heart
    } = this.state

    heart.x = heart.x - 1
    
    this.setState({
      heart
    })
  }

  onRightPress() {
    let {
      heart
    } = this.state

    heart.x = heart.x + 1
    
    this.setState({
      heart
    })
  }

  onUpPress() {
    let {
      heart
    } = this.state

    heart.y = heart.y - 1
    
    this.setState({
      heart
    })
  }

  onBottomPress() {
    let {
      heart
    } = this.state

    heart.y = heart.y + 1
    
    this.setState({
      heart
    })
  }

  onRotatePress() {
    let {
      direction
    } = this.state

    direction += 1
    direction %= 4
    
    this.setState({
      direction
    })
  }

  onPlayAgain() {
     let size = 5
     let board = new Array(size)
     for (var i = 0; i < size; i++) {
        board[i] = new Array(size)
     }

     for(var i = 0; i < size; i ++) {
        for(var j = 0; j < size; j ++) {
            board[i][j] = 0
        } 
     }

     this.setState({
        board: board,
        playerTurn: true, //true == x, false == y
        gameResult: 0, //0 - inProgress, 1 - x, 2 - o, 3-draw 
        step: 0
     })
  }

  onGridPressed(x, y) {
     let {
        board,
        playerTurn,
        step
     } = this.state

     //alert(board[x][y])

     board[x][y] = playerTurn ? 1 : 2
     step ++
     let result = this.gameWinCondition(step, x, y, board, playerTurn)

     playerTurn = !playerTurn
     

     this.setState({
        board,
        playerTurn,
        gameResult: result,
        step
     })
  }

  gameWinCondition(step, x, y, board, playerTurn) {
        //1. Row
        let equalValue = playerTurn ? 1 : 2
        let sum = 0
        //alert(step)
        //alert(board[0][y] + ' ' + board[1][y] + ' ' + board[2][y] + ' ')

        sum = (board[0][y] == equalValue ? 1 : 0) + (board[1][y] == equalValue ? 1 : 0) + (board[2][y] == equalValue ? 1 : 0)

        if(sum == 3) {
            return equalValue
        }

        //2. Column
        sum = (board[x][0] == equalValue ? 1 : 0) + (board[x][1] == equalValue ? 1 : 0) + (board[x][2] == equalValue ? 1 : 0)
        if(sum == 3) {
            return equalValue
        }

        //Diognal
        if(Math.abs(x - y) % 2 == 0) {
            //Middle
            //if(x == 1 && y == 1) {
            sum = (board[0][0] == equalValue ? 1 : 0) + (board[1][1] == equalValue ? 1 : 0) + (board[2][2] == equalValue ? 1 : 0)
            if(sum == 3) {
                return equalValue
            }      

            sum = (board[2][0] == equalValue ? 1 : 0) + (board[1][1] == equalValue ? 1 : 0) + (board[0][2] == equalValue ? 1 : 0)
            if(sum == 3) {
                return equalValue
            }
            //} else {

            //}
        } 
        
        if(step == 9) {
            return 3
        } 
        //5. All filled draw 
        //return 3

        return 0
  }

  _renderOverlay(gameResult) {
      let template = {}

      switch(gameResult) {
         case 1: 
            template = "X win"
            break
         case 2: 
            template = "O win"
            break
         case 3:
            template = "Draw"
            break
         default :
            break
      }

      return (
          <View style={styles.overlayContainer}>
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <Text style={styles.resultText}>{template}</Text>
             </View>
             <View style={{height: 300, justifyContent: 'center', alignItems: 'center',}}>
                 <TouchableOpacity style={{marginBottom: 10, paddingVertical: 10, paddingHorizontal: 60, borderColor: '#fff', borderWidth: 3}}
                                   onPress={this.onPlayAgain}>
                    <Text style={styles.menuText}>PLAY AGAIN</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{paddingVertical: 10, paddingHorizontal: 60, borderColor: '#fff', borderWidth: 3}} onPress={() => this.props.onChangeStage(0)}>
                    <Text style={styles.menuText}>MAIN MENU</Text>
                 </TouchableOpacity>
             </View>
          </View>
      )
  }

  render () {
    let {
        board,
        playerTurn,
        gameResult,
        heart,
        direction
    } = this.state

    return (
      <View style={styles.container}>
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 24, fontWeight: '600'}}>{playerTurn ? "X" : "O"} turn</Text>
            </View>
            
            <View style={{flex: 1}}>
            {
                board.map((row, i) => (
                    <View style={styles.rowContainer}>
                    {
                        row.map((column, j) => (
                            <Grid x={i}
                                  y={j}
                                  value={0}
                                  size={blockSize}
                                  onGridPressed={this.onGridPressed}
                            />
                        ))
                    }
                    </View>
                ))
            }
                <Plane heart={heart}
                       direction={direction}
                />
            </View>


            <View style={[{ height: 200, }]}>
                <GameControl onLeftPress={this.onLeftPress}
                             onRightPress={this.onRightPress}
                             onBottomPress={this.onBottomPress}
                             onUpPress={this.onUpPress}
                             onRotatePress={this.onRotatePress}
                />
            </View>

            <View style={{ height: 60 }}>
                <TouchableOpacity style={{paddingVertical: 10, paddingHorizontal: 60, borderColor: '#ff3165', borderWidth: 3}} 
                                onPress={() => this.props.onChangeStage(0)}>
                    <Text style={[styles.menuText, {color: '#ff3165'}]}>MAIN MENU</Text>
                </TouchableOpacity>
            </View>

            {
                gameResult != 0 && (
                    this._renderOverlay(gameResult)
                )
            }
      </View>
    )
  }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
    },

    overlayContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        borderRadius: 25,
        width: screen.width - 20,
        height: screen.height - 50,
        backgroundColor: 'rgba(0,0,0, 0.8)'
    },

    menuText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 24,
    },

    resultText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 32,
    }
})
