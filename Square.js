import React, { Component } from 'react'

import AttackBoard from './AttackBoard'

import './Square.css'
import shuffle from "lodash.shuffle";

const SIDE = 4

const DISPLAY_STYLE = {display: 'inline-block'}
const HIDE_STYLE = {display: 'none'}

const ADJACENT_FIRST = [[1, 4, 5, -4], [1, 3, 4, 5, -1], [1, 3, 4, 5, -1], [3, 4, -1, -4]]
const ADJACENT_SECOND = [[1, 4, 5, -4], [1, 3, 4, 5, -1, -3, -4, -5], [1, 3, 4, 5, -1, -3, -4, -5], [3, 4, -1, -4]]
const ADJACENT_THIRD = [[1, 4, 5, -4], [1, -1, -3, -4, -5], [1, -1, -3, -4, -5], [3, 4, -1, -4]]

class Square extends Component {

    state = {
        squares: this.generateSquares(),
        currentSquare: '',
        targetSquare: '',
        showAttackBoard: false,
    }

    generateSquares() {
        const arraySquares = []
        const size = SIDE * SIDE

        const players = ['player1', 'player2']
        var i = 1

        while (arraySquares.length < size) {

            if(i%2 === 0) {
                arraySquares.push(this.getSquare(players[0]))
            }else {
                arraySquares.push(this.getSquare(players[1]))
            }

            i ++
        }

        return this.assignAdjacentSquares(shuffle(arraySquares))
    }

    assignAdjacentSquares(arraySquares) {

        var count = 0

        for(var i=0; i < arraySquares.length; i++){

            if(i <= 3){
                arraySquares[i].adjacentSquares = ADJACENT_FIRST[count]
            }else if(i >= (arraySquares.length - 4)){
                arraySquares[i].adjacentSquares = ADJACENT_THIRD[count]
            }else{
                arraySquares[i].adjacentSquares = ADJACENT_SECOND[count]
            }

            count ++

            if(count === 4){
                count = 0
            }
        }

        return arraySquares
    }

    getSquare(owner) {

        var square = {
            'owner': owner,
            'piece': 1,
            'initPiece': 1,
            'selected': {},
            'buttonSelected': {display: 'none'},
            'attackButton': {display: 'none'}
        }

        return square
    }

    handleClickSquare = (index) => {

        const {currentSquare, targetSquare, squares} = this.state
        const {phase} = this.props

        if(phase === 'Assignment'){
            if(currentSquare !== index && this.props.currentPlayer === squares[index].owner){
                if(currentSquare || currentSquare === 0){
                    squares[currentSquare].selected = {}
                    squares[currentSquare].buttonSelected = HIDE_STYLE
                }

                squares[index].selected = {color: '#ADFF2F'}
                squares[index].buttonSelected = DISPLAY_STYLE
                this.state.currentSquare = index

                this.forceUpdate()
            }
        }

        if(this.props.phase === 'Attack'){
            if(currentSquare !== index && this.props.currentPlayer === squares[index].owner){
                if(currentSquare || currentSquare === 0){

                    squares[currentSquare].selected = {}
                    this.state.squares[currentSquare].attackButton = HIDE_STYLE

                    if(targetSquare){
                        squares[targetSquare].selected = {}
                        this.state.targetSquare = ''
                    }
                }

                this.state.squares[index].selected = {color: '#ADFF2F'}
                this.state.currentSquare = index

                this.forceUpdate()
            }

            if(currentSquare || currentSquare === 0){
                if(targetSquare !== index && this.props.currentPlayer !== squares[index].owner){

                    var possibleSquares = this.getAdjacentSquares()

                    if(targetSquare || targetSquare === 0){
                        this.state.squares[targetSquare].selected = {}
                    }

                    if(possibleSquares.includes(index)){
                        this.state.squares[index].selected = {color: '#eded10'}
                        this.state.targetSquare = index
                        this.state.squares[currentSquare].attackButton = {display: 'inline-block'}
                    }

                    this.forceUpdate()
                }
            }
        }
    }

    getAdjacentSquares() {

        const {squares, currentSquare} = this.state

        var result = []
        var arrayAdjacentSquares = squares[currentSquare].adjacentSquares

        arrayAdjacentSquares.forEach(adjacentSquareValue => {
            result.push(currentSquare + adjacentSquareValue)
        })

        return result

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

    showAttackBoard = () => {
        this.setState({'showAttackBoard': true})
    }

    hideAttackBoard = () => {
        this.setState({'showAttackBoard': false})
    }

    render() {
        const {squares} = this.state

        return <div>
            { squares.map((square, index) => (
                <div className={'square '+ square['owner']}
                     key={index}
                     style={ square['selected'] }
                     onClick={this.handleClickSquare.bind(this, index)}>

                    <span className={'piece'}>
                        { square['piece'] }
                    </span>

                    <div style={square['buttonSelected']}>
                        <button onClick={this.increasePiece.bind(this, index)}>+</button>
                        <button onClick={this.decreasePiece.bind(this, index)}>-</button>
                    </div>

                    <div style={square['attackButton']}>
                        <AttackBoard
                            show={this.state.showAttackBoard}
                            hideAttackBoard={this.hideAttackBoard}
                        />

                        <button onClick={this.showAttackBoard}>Attack</button>
                    </div>
                </div>
            ))}
        </div>
    }
}

export default Square