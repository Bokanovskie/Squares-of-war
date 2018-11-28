import React, { Component } from 'react';
import './App.css';

import Square from "./Square";
import Party from "./Party";

class App extends Component {

    state = {
        currentPlayer: 'player1',
        phase: 'Assignment',
        currentPieceToAssign: 3,
        maxPieceToAssign: 3,
    }

    handlePartyInfo = partyInfo => {
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

              handlePartyInfo={this.handlePartyInfo}
          />

          <Square
            currentPlayer={this.state.currentPlayer}
            phase={this.state.phase}
            currentPieceToAssign={this.state.currentPieceToAssign}
            maxPieceToAssign={this.state.maxPieceToAssign}

            handleUpdatePieceToAssign={this.handleUpdatePieceToAssign}
          />

      </div>
    );
  }
}

export default App;