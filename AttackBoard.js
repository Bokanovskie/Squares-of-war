import React, { Component } from 'react'

import './AttackBoard.css'

export const RESULT_WIN = 'win'
export const RESULT_DEFEAT = 'defeat'
export const RESULT_EQUALITY = 'equality'

class AttackBoard extends Component{

    state = {
        currentAttackPieces: 0,
        currentDefenderPieces: 0,

        restAttackPieces: 0,
        piecesToTransfert: 0,

        resultsAttack: [],
        resultsDefend: [],

        resultSession: '',

        attackFinish: false,
    }

    attackAction = () => {

        const {
            currentAttackPieces,
            currentDefenderPieces,
            resultsAttack,
            resultsDefend} = this.state

        this.setState({restAttackPieces: this.props.attackerPieces})

        let xCurrentAttackPieces = Array(currentAttackPieces)
        let yCurrentDefenderPieces = Array(currentDefenderPieces)

        let initAttackPiece = currentAttackPieces

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

            resultsAttack.push(result_attack_random)
            resultsDefend.push(result_defender_random)

            this.forceUpdate()

            // Loop de comparaison des résultats
            for(let i=0; i < result_attack_random.length; i++){

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

        // Calcul du nombre de pièce restantes
        let computedRestPices = this.props.attackerPieces - (initAttackPiece - xCurrentAttackPieces.length)

        // Si l'attaquant gagne affiche automatiquement le tableau de transfert de pion
        if(xCurrentAttackPieces.length > 1 && yCurrentDefenderPieces.length === 0){
            this.setState({
                restAttackPieces: this.state.restAttackPieces - 1,
                currentAttackPieces: computedRestPices - 1,
                piecesToTransfert: 1,
                attackFinish: true,
                resultSession: RESULT_WIN

            })
        }else if(xCurrentAttackPieces.length === 1 && yCurrentDefenderPieces.length === 1){
            this.setState({
                restAttackPieces: computedRestPices,
                attackFinish: true,
                resultSession: RESULT_EQUALITY

            })
        }else if(xCurrentAttackPieces.length === 1 && yCurrentDefenderPieces.length >= 1){
            this.setState({
                restAttackPieces: computedRestPices,
                attackFinish: true,
                resultSession: RESULT_DEFEAT

            })
        }

        this.setState({restAttackPieces: computedRestPices})
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

    increaseTransfertPieces = () => {
        const {piecesToTransfert, restAttackPieces, currentAttackPieces} = this.state

        if(piecesToTransfert < restAttackPieces && currentAttackPieces > 1){
            this.setState({
                piecesToTransfert: piecesToTransfert + 1,
                currentAttackPieces: currentAttackPieces - 1
            })
        }
    }

    decreaseTransfertPieces = () => {
        const {piecesToTransfert, currentAttackPieces} = this.state

        if(piecesToTransfert > 1 && piecesToTransfert > 0){
            this.setState({
                piecesToTransfert: piecesToTransfert - 1,
                currentAttackPieces: currentAttackPieces + 1
            })
        }
    }

    hideAttackBoard = () => {

        const {
            attackFinish,
            resultSession,
            currentAttackPieces,
            piecesToTransfert,
            currentDefenderPieces} = this.state

        if(attackFinish){
            if(resultSession === RESULT_WIN){
                this.props.hideAttackBoard(
                    currentAttackPieces,
                    piecesToTransfert,
                    resultSession
                )
            }
            else if(resultSession === RESULT_EQUALITY){
                this.props.hideAttackBoard(
                    currentAttackPieces,
                    currentDefenderPieces,
                    resultSession
                )
            }
            else if(resultSession === RESULT_DEFEAT){
                this.props.hideAttackBoard(
                    currentAttackPieces,
                    currentDefenderPieces,
                    resultSession
                )
            }

            this.setState(
                {
                    currentAttackPieces: 0,
                    restAttackPieces: 0,
                    currentDefenderPieces: 0,
                    resultsAttack: [],
                    resultsDefend: [],
                    attackFinish: false,
                }
            )
        }
        else{
            this.props.hideAttackBoard()
        }
    }

    render() {

        const {show} = this.props
        const {
            currentAttackPieces,
            currentDefenderPieces,
            resultsAttack,
            resultsDefend,
            attackFinish,
            piecesToTransfert,
            resultSession} = this.state

        const showHideClassname = show ? 'modal display-block' : 'modal display-none'
        const showHideAttackInfoDiv = currentAttackPieces !== 0 && attackFinish === false ? 'display-block' : 'display-none'
        const showHideAttackButtonDiv = attackFinish === false ? 'display-block' : 'display-none'
        const showHideTransfertDiv = attackFinish && resultSession === RESULT_WIN? 'display-block' : 'display-none'

        return <div className={showHideClassname}>
            <section className={'modal-main'}>

                {/* Attack information */}
                <div className={showHideAttackInfoDiv}>
                    <button onClick={this.attackAction}>Attack</button>
                    <p>Attacker pieces: {currentAttackPieces}</p>
                    <p>Defender pieces: {currentDefenderPieces}</p>
                </div>

                {/* Transfert Block */}
                <div className={showHideTransfertDiv}>
                    <h2>Select pieces to transfert</h2>
                    <p>Current square: {currentAttackPieces}</p>
                    <p>Target square: {piecesToTransfert}</p>
                    <div>
                        <button onClick={this.increaseTransfertPieces}>+</button>
                        <button onClick={this.decreaseTransfertPieces}>-</button>
                    </div>
                </div>
                {/* Attack Block */}
                <div className={showHideAttackButtonDiv}>
                    <h2>Select pieces to attack</h2>
                    <div>
                        <button onClick={this.increaseAttackPieces}>+</button>
                        <button onClick={this.decreaseAttackPieces}>-</button>
                    </div>
                </div>

                {/* Bouton de cloture */}
                <div>
                    <button onClick={this.hideAttackBoard}>Validate</button>
                </div>

                {/* Result session block */}
                <div>
                    <h2>Party result:</h2>
                    <div>
                        {resultSession}
                    </div>
                </div>

                {/* Result dés block */}
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