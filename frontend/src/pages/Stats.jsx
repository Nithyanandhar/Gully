import React , { useState } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'
import PlayerStats from '../components/PlayerStats'

const Stats = () => {

    return (
        
        <div>
            <NavBar/>

            <div>
                <div>Match Stats</div>
                
            </div>

            <PlayerStats/>

        </div>
    )
}
export default Stats