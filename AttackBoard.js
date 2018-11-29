import React, { Component } from 'react'

import './AttackBoard.css'

class AttackBoard extends Component{

    state = {
        currentAttackPieces: 0,
        currentDefenderPieces: 0,
    }

    attackAction = () => {

        var xCurrentAttackPieces = Array(this.state.currentAttackPieces)
        var yCurrentDefenderPieces = Array(this.state.currentDefenderPieces)

        while(true){

            var result_attack_random = []
            var result_defender_random = []

            while(result_attack_random.length < 3){
                result_attack_random.push(Math.floor(Math.random() * 6) + 1)
            }

            while(result_defender_random.length < 2){
                result_defender_random.push(Math.floor(Math.random() * 6) + 1)
            }

            // Trie des tableaux de résultats et supprime
            // le permière élément du tableau d'attaque
            result_attack_random.sort().shift()
            result_defender_random.sort()

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

        this.props.hideAttackBoard(this.state.currentAttackPieces, this.state.currentDefenderPieces)
    }

    render() {

        const {show} = this.props
        const showHideClassname = show ? 'modal display-block' : 'modal display-none'

        return <div className={showHideClassname}>
            <section className={'modal-main'}>
                <p>Attacker pieces: {this.state.currentAttackPieces}</p>
                <p>Defender pieces: {this.state.currentDefenderPieces}</p>

                <div>
                    <div>
                        <button onClick={this.increaseAttackPieces}>+</button>
                        <button onClick={this.decreaseAttackPieces}>-</button>
                    </div>
                    <button onClick={this.attackAction}>Attack</button>
                </div>

                <button onClick={this.hideAttackBoard}>close</button>
            </section>
        </div>
    }
}

export default AttackBoard