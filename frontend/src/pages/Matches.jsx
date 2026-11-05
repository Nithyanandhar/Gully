import React , { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Matches = () => {

    const navigate = useNavigate();
    const [matches, setmatches] = useState([])

    useEffect(()=>{
        async function fetchMatch(){
            const response = await axios.get("http://localhost:8080/matches")
    
            const fetchedmatch = response.data.data.data.data.data;

            setmatches(fetchedmatch);
    
        }
        fetchMatch()
    },[])

    function handleClick(e,match){

        e.preventDefault()
        navigate(`/live/${match}`)
    }

    return (
        <div>
            <NavBar/>
       

            <div className="min-h-screen bg-slate-950 px-4 py-10">
                <div className="mx-auto max-w-7xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">

                <h1 className="mb-6 text-2xl font-bold text-white">
                    Live Matches
                </h1>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {matches && matches.map((match) => (
                        <div
                            key={match.match}
                            onClick={(e) => handleClick(e, match.match)}
                            className="group cursor-pointer rounded-xl border border-slate-700/60 bg-slate-950 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:bg-slate-800"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-white group-hover:text-blue-400">
                                    {match.match}
                                </h2>

                                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
                                    {match.format}
                                </span>
                            </div>

                            <div className="space-y-3 border-t border-slate-700 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-400">Date</span>
                                    <span className="text-sm text-slate-200">{match.date}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-400">Gender</span>
                                    <span className="text-sm capitalize text-slate-200">{match.gender}</span>
                                </div>
                            </div>

                            <div className="mt-5 flex justify-end text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                                View match →
                            </div>
                        </div>
                    ))}
                </div>

                </div>
            </div>
        </div>
    )
}

export default Matches
