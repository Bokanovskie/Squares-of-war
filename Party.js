import React, { Component } from 'react';

import './Party.css'

class Party extends Component{

    onNextClick = () => {

        var partyInfo = {
            'currentPlayer': 'player2',
            'phase': 'Attack',
            'pieceToAssign': 3,
        }

        this.props.handlePartyInfo(partyInfo)
    }

    render() {

        return <div className="party">
                    <span className="item-party">
                        Player: { this.props.currentPlayer }
                    </span>

                    <span className="item-party">
                        Phase: { this.props.phase }
                    </span>

                    <span className="item-party">
                        Piece to assign: { this.props.pieceToAssign }
                    </span>

                    <span>
                        <button onClick={this.onNextClick}>Next</button>
                    </span>
                </div>

    }
}

export default Party