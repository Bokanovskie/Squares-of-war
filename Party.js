import React, { Component } from 'react';

import './Party.css'

const PHASES = ['Assignment', 'Attack', 'Transfert']

class Party extends Component{

    state = {
        players: ['player1', 'player2'],
        player_index: 0,
        phase_index: 0,
        pieceToAssign: 0,

        showStart: true,
    }

    onNextClick = () => {

        const {phase_index, player_index, players} = this.state

        if(phase_index === PHASES.length - 1 && player_index < players.length - 1){
            this.setState({phase_index: 0, player_index: player_index + 1})
        }else if(phase_index === PHASES.length - 1 && player_index === players.length - 1){
            this.setState({phase_index: 0, player_index:0})
        }else{
            this.setState({phase_index: phase_index + 1})
        }

        let partyInfo = {
            'currentPlayer': players[player_index],
            'phase': PHASES[phase_index],
            'pieceToAssign': this.computePiecesToAssign(),
        }

        this.props.handlePartyInfo(partyInfo)
        this.setState({showStart: false})

    }

    computePiecesToAssign(){

    }

    render() {
        const showStart = this.state.showStart ? 'display-block' : 'display-none'
        const showNext = this.state.showStart === false ? 'display-block' : 'display-none'

        return <div className={'header-container'}>
            <header className="party header">
                <div className={'row'}>
                    <div className={'col-md-3'}>
                        <span className="item-party">
                            <span>Player:</span> <span>{ this.props.currentPlayer }</span>
                        </span>
                    </div>

                    <div className={'col-md-3'}>
                        <span className="item-party">
                         <span>Phase:</span> <span>{ this.props.phase }</span>
                        </span>
                    </div>

                    <div className={'col-md-3'}>
                        <span className="item-party">
                         <span>Piece to assign:</span> <span>{ this.props.pieceToAssign }</span>
                        </span>
                    </div>

                    <div className={'col-md-3'}>
                        <span className={showStart}>
                            <button onClick={this.onNextClick} className={'btn btn-primary'}>Start</button>
                        </span>

                        <span className={showNext}>
                            <button onClick={this.onNextClick} className={'btn btn-primary'}>Next</button>
                        </span>
                    </div>
                </div>
            </header>
        </div>
    }
}

export default Party