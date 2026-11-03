import React, { useState , useEffect} from 'react'
import axios from 'axios'

const Player = () => {

    const [playerarr, setplayerarr] = useState([]);

    useEffect(()=>{
        async function fectchPlayers(){
            const response = await axios.get("http://localhost:3000/stats/",{withCredentials : true})
            const players = response.data;
            setplayerarr(players.data.data)
        }
        fectchPlayers();
    },[])
   
    return (
        <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Players
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Explore player statistics and match records.
                    </p>
                </div>

                {
                    playerarr && (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {
                                playerarr.map((player) => (
                                    <div
                                        key={player.name}
                                        className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-800"
                                    >
                            
                                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-xl">
                                            🏏
                                        </div>

                                        <h3 className="truncate text-lg font-semibold text-white transition-colors group-hover:text-emerald-400">
                                            {player.name}
                                        </h3>

                                        <div className="mt-5 border-t border-slate-800 pt-4">
                                            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                                Matches Played
                                            </p>

                                            <p className="mt-1 text-2xl font-bold text-emerald-400">
                                                {player.matches}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Player
