import React, { Component } from 'react';
import './App.css';

import Square from "./Square";
import Party from "./Party";

class App extends Component {

    constructor(props){
        super(props)
        this.child = React.createRef()
    }

    state = {
        maxPieceToAssign: 3,
        squares: [],
        currentSquare: undefined,
    }

    handleSquares = (squares) => {
        this.setState({squares: squares})
    }

    handlePartyInfo = partyInfo => {

        this.child.cleanSquare()

        this.setState(prevState => (
                {
                    currentPlayer: partyInfo.currentPlayer,
                    phase: partyInfo.phase,
                    currentPieceToAssign: partyInfo.pieceToAssign,
                    maxPieceToAssign: partyInfo.pieceToAssign
                }
            )
        )}

    handleUpdatePieceToAssign = pieceToAssign => {
        this.setState(prevState => ({ currentPieceToAssign: pieceToAssign }))
    }

    render() {

        return (

            <div className="board">

                <Party
                    currentPlayer={this.state.currentPlayer}
                    phase={this.state.phase}
                    pieceToAssign={this.state.currentPieceToAssign}
                    squares={this.state.squares}

                    handlePartyInfo={this.handlePartyInfo}
                />

                <div className={'container-fluid'}>
                    <Square
                        onRef={ref => (this.child = ref)}

                        currentPlayer={this.state.currentPlayer}
                        phase={this.state.phase}
                        currentPieceToAssign={this.state.currentPieceToAssign}
                        maxPieceToAssign={this.state.maxPieceToAssign}

                        handleUpdatePieceToAssign={this.handleUpdatePieceToAssign}
                        handleSquares={this.handleSquares}
                        cleanSquare={this.cleanSquare}
                    />
                </div>
            </div>
        );
    }
}

export default App;