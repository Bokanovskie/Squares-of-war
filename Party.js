import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

import './Party.css'

class Party extends Component{

    onNextClick = () => {

        var partyInfo = {
            'currentPlayer': 'player1',
            'phase': 'Attack',
            'pieceToAssign': 0,
        }

        this.props.handlePartyInfo(partyInfo)
    }

    render() {
        return <div className={'header-container'}>
            <header className="party header">
                 <span className="item-party">
                     <span>Player:</span> <span>{ this.props.currentPlayer }</span>
                 </span>

                <span className="item-party">
                     <span>Phase:</span> <span>{ this.props.phase }</span>
                 </span>

                <span className="item-party">
                     <span>Piece to assign:</span> <span>{ this.props.pieceToAssign }</span>
                 </span>

                <span>
                     <button onClick={this.onNextClick} className={'btn btn-primary'}>Next</button>
                 </span>
            </header>
        </div>
    }
}

export default Party