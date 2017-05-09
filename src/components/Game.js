import React, { PropTypes, Component } from 'react'
import { 
	StyleSheet,
	View, 
	Text,
	TouchableOpacity,
    Dimensions
} from 'react-native'

import Grid from './Grid'

const blockSize = 100
const screen = Dimensions.get('window')

export default class Game extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
        board: [
           [{value: 0},{value: 0},{value: 0}]
        , 
           [{value: 0},{value: 0},{value: 0}]
        , 
           [{value: 0},{value: 0},{value: 0}]
        ],

        playerTurn: true, //true == x, false == y
        gameResult: 0, //0 - inProgress, 1 - x, 2 - o, 3-draw 
        step: 0
    }

    this.onGridPressed = this.onGridPressed.bind(this)
    this._renderOverlay = this._renderOverlay.bind(this)
    this.gameWinCondition = this.gameWinCondition.bind(this)
    this.onPlayAgain = this.onPlayAgain.bind(this)

    //this.onPlayAgain()
  }

  onPlayAgain() {
     this.setState({
        board: [
           [{value: 0},{value: 0},{value: 0}]
        , 
           [{value: 0},{value: 0},{value: 0}]
        , 
           [{value: 0},{value: 0},{value: 0}]
        ],

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

     //alert(board[x][y].value)

     board[x][y].value = playerTurn ? 1 : 2
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
        //alert(board[0][y].value + ' ' + board[1][y].value + ' ' + board[2][y].value + ' ')

        sum = (board[0][y].value == equalValue ? 1 : 0) + (board[1][y].value == equalValue ? 1 : 0) + (board[2][y].value == equalValue ? 1 : 0)

        if(sum == 3) {
            return equalValue
        }

        //2. Column
        sum = (board[x][0].value == equalValue ? 1 : 0) + (board[x][1].value == equalValue ? 1 : 0) + (board[x][2].value == equalValue ? 1 : 0)
        if(sum == 3) {
            return equalValue
        }

        //Diognal
        if(Math.abs(x - y) % 2 == 0) {
            //Middle
            //if(x == 1 && y == 1) {
            sum = (board[0][0].value == equalValue ? 1 : 0) + (board[1][1].value == equalValue ? 1 : 0) + (board[2][2].value == equalValue ? 1 : 0)
            if(sum == 3) {
                return equalValue
            }      

            sum = (board[2][0].value == equalValue ? 1 : 0) + (board[1][1].value == equalValue ? 1 : 0) + (board[0][2].value == equalValue ? 1 : 0)
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
        gameResult
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
                                  value={board[i][j].value}
                                  size={blockSize}
                                  onGridPressed={this.onGridPressed}
                            />
                        ))
                    }
                    </View>
                ))
            }
            </View>

            <View style={{ height: 100 }}>
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
