import React, { Component } from 'react'

import './Square.css'
import shuffle from "lodash.shuffle";

const SIDE = 4

const DISPLAY_STYLE = {display: 'inline-block'}
const HIDE_STYLE = {display: 'none'}

class Square extends Component {

    state = {
        squares: this.generateSquares(),
        currentSquare: '',
    }

    generateSquares() {
        const result = []
        const size = SIDE * SIDE

        const players = ['player1', 'player2']
        var i = 1

        while (result.length < size) {

            if(i%2 === 0) {
                result.push(this.getSquare(players[0]))
            }else {
                result.push(this.getSquare(players[1]))
            }

            i ++
        }

        return shuffle(result)
    }

    getSquare(owner) {

        var square = {
            'owner': owner,
            'piece': 1,
            'initPiece': 1,
            'selected': ' ',
            'buttonSelected': {display: 'none'}
        }

        return square
    }

    handleClickSquare = (index) => {

        const {currentSquare, squares} = this.state

        if(this.props.phase === 'Assignment'){
            if(currentSquare !== index && this.props.currentPlayer === squares[index].owner){
                if(currentSquare || currentSquare === 0){
                    squares[currentSquare].selected = ' '
                    squares[currentSquare].buttonSelected = HIDE_STYLE
                }

                this.state.squares[index].selected = 'selected '
                this.state.squares[index].buttonSelected = DISPLAY_STYLE
                this.state.currentSquare = index

                this.forceUpdate()
            }
        }
    }

    increasePiece = (index) => {

        const {currentPieceToAssign, handleUpdatePieceToAssign} = this.props
        const {squares} = this.state

        if(currentPieceToAssign > 0){

            squares[index].piece = squares[index].piece + 1
            this.forceUpdate()

            var value = currentPieceToAssign - 1
            handleUpdatePieceToAssign(value)
        }
    }

    decreasePiece = (index) => {

        const {currentPieceToAssign, maxPieceToAssign, handleUpdatePieceToAssign} = this.props
        const {squares} = this.state

        if(currentPieceToAssign < maxPieceToAssign && squares[index].piece > 1 && squares[index].piece > squares[index].initPiece){
            squares[index].piece = squares[index].piece - 1
            this.forceUpdate()

            var value = this.props.currentPieceToAssign + 1
            handleUpdatePieceToAssign(value)
        }
    }

    render() {
        const {squares} = this.state

        return <div>
            { squares.map((square, index) => (
                <div className={'square '+ square['selected'] + square['owner']}
                     key={index}
                     onClick={this.handleClickSquare.bind(this, index)}>

                    <span className={'piece'}>
                        { square['piece'] }
                    </span>

                    <div style={square['buttonSelected']}>
                        <button onClick={this.increasePiece.bind(this, index)}>+</button>
                        <button onClick={this.decreasePiece.bind(this, index)}>-</button>
                    </div>
                </div>
            ))}
        </div>
    }
}

export default Square