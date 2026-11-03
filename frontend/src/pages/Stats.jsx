import React , { useState } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'
import PlayerStats from '../components/PlayerStats'
import Player from '../components/Player'

const Stats = () => {

    return (
        
        <div>
            <NavBar/>
{/* 
            <div>
                <div>Match Stats</div>
                
            </div> */}

            <PlayerStats/>
            {/* <Player/> */}

        </div>
    )
}
export default Stats