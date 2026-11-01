import axios from 'axios'
import { useState } from 'react'

const PlayerStats = () => {

    const [playerStats , setplayerStats] = useState(null)
    
    const stats = ["matches", "runs" , "high_score" , "average","strike_rate","hundreds","fifties" , "sixes", "fours"];
    const matches = ["t20i", "odi" , "test"];
    const actions = ["batting" , "bowling"]

    async function handleSearch(event) {
        try{
            
            event.preventDefault();
            
            const response = await axios.post("http://localhost:3000/stats/player",
                {player : event.target.playername.value}
            )
            
            setplayerStats(response.data.data.data);
            
        }
        catch(error){
            console.log(error)
        }
    }
    
    return (
            <div>
                <div>Player Stats</div>
                <form onSubmit={()=>{handleSearch(event)}}>
                    <input type='text' name='playername' placeholder='Player Name' />
                    <button>Search</button>
                </form>
                <div>
                    {playerStats && 
                        <>
                            <div>{playerStats.name}</div>
                            <div>
                                <div>
                                    {
                                        actions.map((action)=>(
                                            <div key={action}>
                                                <h1>{action}</h1>
                                                {matches.map((match)=>(
                                                    <div key={match}>
                                                    <h3>{match}</h3>
                                                    {stats.map((stat)=>(
                                                        
                                                        <p key={`${action}-${match}-${stat}`}>{stat} : {playerStats[action][match][stat]}</p>
                                                        
                                                    ))}
                                                    </div>
                                                ))}
                                            </div>
                                        ))
                                    }
                                  
                                </div>

                            </div>

                        </>
                    }
                </div>
            </div>
    )
}

export default PlayerStats
