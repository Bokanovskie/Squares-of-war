import React, { Component } from 'react'

import './AttackBoard.css'

class AttackBoard extends Component{

    state = {
        currentAttackPieces: 0,
        currentDefenderPieces: 0,
        restAttackPieces: 0,

        resultsAttack: [],
        resultsDefend: [],
    }

    attackAction = () => {

        this.setState({restAttackPieces: this.props.attackerPieces})

        let xCurrentAttackPieces = Array(this.state.currentAttackPieces)
        let yCurrentDefenderPieces = Array(this.state.currentDefenderPieces)

        let initAttackPiece = this.state.currentAttackPieces

        while(true){

            const result_attack_random = []
            const result_defender_random = []

            let thresholdAttack = 3
            let thresholdDefend = 2

            if(xCurrentAttackPieces.length == 2){
                thresholdAttack = 2
            }

            if(yCurrentDefenderPieces.length == 1){
                thresholdDefend = 1
            }

            while(result_attack_random.length < thresholdAttack){
                result_attack_random.push(Math.floor(Math.random() * 6) + 1)
            }

            while(result_defender_random.length < thresholdDefend){
                result_defender_random.push(Math.floor(Math.random() * 6) + 1)
            }

            // Trie des tableaux de résultats et supprime
            // le permière élément du tableau d'attaque
            if(result_attack_random.length > 2){
                result_attack_random.sort().shift()
            }

            if(result_defender_random.length === 1){
                result_attack_random.shift()
            }

            result_defender_random.sort()

            this.state.resultsAttack.push(result_attack_random)
            this.state.resultsDefend.push(result_defender_random)

            this.forceUpdate()

            for(var i=0; i < result_attack_random.length; i++){

                //Si le résultat du défenseur est supérieur ou égale
                //au résultat de l'attaquant, ce dernier perd un pion
                if(result_defender_random[i] > result_attack_random[i]
                    || result_defender_random[i] === result_attack_random[i]){
                    xCurrentAttackPieces.pop()
                    this.setState({currentAttackPieces: xCurrentAttackPieces.length})

                    if(xCurrentAttackPieces.length === 1){
                        break
                    }

                }else{
                    yCurrentDefenderPieces.pop()
                    this.setState({currentDefenderPieces: yCurrentDefenderPieces.length})

                    if(yCurrentDefenderPieces.length === 0){
                        break
                    }
                }
            }

            if(xCurrentAttackPieces.length === 1 || yCurrentDefenderPieces.length === 0){
                break
            }
        }

        this.setState({restAttackPieces: this.props.attackerPieces - (initAttackPiece - xCurrentAttackPieces.length)})
    }

    increaseAttackPieces = () => {

        const {attackerPieces, defenderPieces} = this.props
        const {currentAttackPieces} = this.state

        this.setState({currentDefenderPieces: defenderPieces})

        if(currentAttackPieces < attackerPieces){
            this.setState({currentAttackPieces: this.state.currentAttackPieces + 1})
        }
    }

    decreaseAttackPieces = () => {
        const {defenderPieces} = this.props
        const {currentAttackPieces} = this.state

        this.setState({currentDefenderPieces: defenderPieces})

        if(currentAttackPieces > 1){
            this.setState({currentAttackPieces: this.state.currentAttackPieces - 1})
        }
    }

    hideAttackBoard = () => {

        this.props.hideAttackBoard(this.state.restAttackPieces, this.state.currentDefenderPieces)
        this.setState({currentAttackPieces: 0})
        this.setState({currentDefenderPieces: 0})
    }

    render() {

        const {show} = this.props
        const {currentAttackPieces, currentDefenderPieces, restAttackPieces, resultsAttack, resultsDefend} = this.state
        const showHideClassname = show ? 'modal display-block' : 'modal display-none'

        return <div className={showHideClassname}>
            <section className={'modal-main'}>
                <p>Attacker pieces: {currentAttackPieces}</p>
                <p>Defender pieces: {currentDefenderPieces}</p>
                <p>Rest pieces: {restAttackPieces}</p>

                <div>
                    <div>
                        <button onClick={this.increaseAttackPieces}>+</button>
                        <button onClick={this.decreaseAttackPieces}>-</button>
                    </div>
                    <button onClick={this.attackAction}>Attack</button>
                </div>

                <button onClick={this.hideAttackBoard}>close</button>

                <div>
                    Result Attack: {resultsAttack.map((result, index) => (
                                    <div key={index}>
                                        <span>
                                            {result}
                                        </span>
                                    </div>
                ))}

                    Result Defend: {resultsDefend.map((result, index) => (
                    <div key={index}>
                        {result}
                    </div>
                ))}
                </div>
            </section>
        </div>
    }
}

export default AttackBoard