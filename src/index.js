import React, { Component } from 'react'

import MainMenu from './components/MainMenu'
import Game from './components/Game'

export default class TicTacToe extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
	     stage: 0, //0-Main Menu, 1-Game Process, 2-Summery
	  }

	  this.onChangeStage = this.onChangeStage.bind(this)
	}

	onChangeStage(stage) {
		this.setState({
			stage
		})
	}

	_renderState(stage) {
		switch(stage) {
			case 0:
				return <MainMenu onChangeStage={this.onChangeStage}/>
			case 1:
				return <Game onChangeStage={this.onChangeStage}/>
			default:
				return
		}
	}

	render() {
		let {
			stage
		} = this.state

		return (
			this._renderState(stage)
		)
	}
}