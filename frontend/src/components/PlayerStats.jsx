import axios from 'axios'
import { useState } from 'react'
import Player from './Player';

const PlayerStats = () => {

    const [playerStats , setplayerStats] = useState(null)
    
    const stats = ["matches", "runs" , "high_score" , "average","strike_rate","hundreds","fifties" , "sixes", "fours"];
    const matches = ["t20i", "odi" , "test"];
    const actions = ["batting" , "bowling"]



    async function handleSearch(event) {
        try{
            
            event.preventDefault();
            const player = event.target.playername.value
            const response = await axios.get(`http://localhost:3000/stats/${player}`)
            
            setplayerStats(response.data.data.data);
            
        }
        catch(error){
            console.log(error)
        }
    }
    
    return (

        <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-8 py-10">

            <div className="max-w-6xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Player <span className="text-blue-500">Stats</span>
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Search and explore cricket player statistics
                    </p>
                </div>

                <form
                    className="flex flex-col sm:flex-row gap-3 mb-10 max-w-xl"
                    onSubmit={()=>{handleSearch(event)}}
                >
                    <input
                        type="text"
                        name="playername"
                        placeholder="Enter player name..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    />

                    <button className="bg-blue-600 hover:bg-blue-500 px-7 py-3 rounded-xl font-semibold transition duration-200 active:scale-95">
                        Search
                    </button>
                </form>

                <div>
                    {playerStats &&
                        <>
                         
                            <div className="mb-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                                <p className="text-sm text-slate-400 mb-2">
                                    Player Profile
                                </p>
                                <h2 className="text-2xl font-bold">
                                    {playerStats.name}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {
                                    actions.map((action)=>(
                                        <div
                                            key={action}
                                            className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                                        >
                                            <h1 className="text-xl font-bold capitalize text-blue-400 mb-6 border-b border-slate-800 pb-4">
                                                {action}
                                            </h1>

                                            {matches.map((match)=>(
                                                <div
                                                    key={match}
                                                    className="mb-6 last:mb-0"
                                                >
                                                    <h3 className="text-lg font-semibold text-white mb-4">
                                                        {match}
                                                    </h3>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        {stats.map((stat)=>(
                                                            <div
                                                                key={`${action}-${match}-${stat}`}
                                                                className="bg-slate-800/70 rounded-xl p-4"
                                                            >
                                                                <p className="text-xs text-slate-400 capitalize mb-2">
                                                                    {stat}
                                                                </p>

                                                                <p className="text-xl font-bold text-white break-words">
                                                                    {playerStats[action][match][stat]}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                }

                            </div>
                        </>
                    }
                </div>
                <Player/>

            </div>
        </div>

    )
}

export default PlayerStats
