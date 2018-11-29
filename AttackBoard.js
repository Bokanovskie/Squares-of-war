import React, { Component } from 'react'

import './AttackBoard.css'

class AttackBoard extends Component{

    render() {

        const {show, hideAttackBoard} = this.props
        const showHideClassname = show ? 'modal display-block' : 'modal display-none'

        return <div className={showHideClassname}>
            <section className={'modal-main'}>
                <p>MODAL</p>
                <button onClick={hideAttackBoard}>close</button>
            </section>
        </div>
    }
}

export default AttackBoard