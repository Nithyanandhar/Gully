import React, { useState , useEffect } from 'react'
import axios from "axios"
import NavBar from '../components/NavBar';

const Teams = () => {

    const [clubTeams , setclubTeams] = useState([]);
    const [internationalTeams , setinternationalTeams] = useState([]);
    const [teams , setteams] = useState([]);
    const [team , setteam] = useState();
    const [failed , setfailed] = useState(false);



    useEffect(()=>{
        async function getTeams(){
            const response = await axios.get("http://localhost:8080/teams/");
               
            const teamData = response.data.data.data.data;
           
            setteams(teamData.data);
            
            const clubs = teamData.data.filter((team)=>{
                return team.type ==="club"
            })
            setclubTeams(clubs)
          
            
            setinternationalTeams(teamData.data.filter((team)=>team.type === "international"))
            
        }
        getTeams();
    },[])
    async function handleSearch(event){
        try{
            event.preventDefault();
            const team = event.target.team.value;
            const teamDetails =await axios.get(`http://localhost:8080/teams/${team}`)
            const dteam = teamDetails.data.data
            setteam(dteam);
            if(teamDetails.data.message === "Request failed with status code 404"){
                setfailed(true)
            };
        }
        catch(error){
            console.log(error.message)
        }
    }


    return (
        <>
            <NavBar/>

            <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-8 py-10">

                <div className="max-w-7xl mx-auto">

                    <div className="mb-10">
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            Teams<span className="text-blue-500">.</span>
                        </h1>
                        <p className="text-slate-400 mt-2">
                            Explore international and domestic cricket teams
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-12">
                        <h2 className="text-xl font-bold mb-5">
                            Find a Team
                        </h2>

                        <form
                            className="flex flex-col sm:flex-row gap-3 max-w-xl"
                            onSubmit={(e)=>handleSearch(e)}
                        >
                            <input
                                type="text"
                                name="team"
                                placeholder="Enter a team..."
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                            />
                           

                            <button className="bg-blue-600 hover:bg-blue-500 px-7 py-3 rounded-xl font-semibold transition duration-200 active:scale-95">
                                Search
                            </button>
                        </form>
                    </div>
                    
            
                    {team && 
                        <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">

                            <p className="text-3xl font-bold text-white border-b border-gray-700 pb-4">
                                {team.data.name}
                            </p>

                            <div className="space-y-4">
                                <p className="text-xl font-semibold text-white">
                                    Player who played most matches
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {
                                        team.data.most_matches.map((player)=>(
                                            <div key={player.name} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-green-500 transition">
                                                <p className="text-lg font-semibold text-white">{player.name}</p>
                                                <p className="text-3xl font-bold text-green-400 mt-2">{player.matches}</p>
                                                <p className="text-sm text-gray-500">Matches played</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-xl font-semibold text-white">Records</div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {
                                        Object.keys(team.data.record).map(key => (
                                            <div key={key} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-green-500 transition">
                                                <h3 className="text-lg font-bold text-green-400 mb-4">{key}</h3>

                                                <div className="space-y-3">
                                                    <p className="flex justify-between text-gray-400">
                                                        Played <span className="text-white font-semibold">{team.data.record[key].played}</span>
                                                    </p>
                                                    <p className="flex justify-between text-gray-400">
                                                        Won <span className="text-green-400 font-semibold">{team.data.record[key].won}</span>
                                                    </p>
                                                    <p className="flex justify-between text-gray-400">
                                                        Lost <span className="text-red-400 font-semibold">{team.data.record[key].lost}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-xl font-semibold text-white">Competitions</div>

                                <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                                    {
                                        team.data.competitions.map((competition)=>(
                                            <div key={competition.competition} className="flex justify-between items-center p-5 border-b border-gray-800 last:border-0 hover:bg-gray-800 transition">
                                                <p className="text-white font-medium">{competition.name}</p>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-green-400">{competition.matches}</p>
                                                    <p className="text-xs text-gray-500">Matches</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    }
                    {
                        failed &&
                        <p className="text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 my-4 font-medium">
                            Team not found
                        </p>
                    }

                    <div className="mb-14">

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Club Teams</h1>
                                <p className="text-sm text-slate-400 mt-1">
                                    Explore domestic and franchise teams
                                </p>
                            </div>

                            <span className="text-sm text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                                {clubTeams.length} Teams
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                            {clubTeams &&
                                clubTeams.slice(0, 10).map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/60 hover:bg-slate-800/70 transition duration-200 group"
                                    >
                                       
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-lg">
                                                {item.name?.charAt(0)}
                                            </div>

                                            <span className="text-xs text-slate-500 uppercase tracking-wider">
                                                Club
                                            </span>
                                        </div>

                                        <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                                            {item.name}
                                        </h2>

                                        <p className="text-sm text-slate-400 mt-2">
                                            Matches: <span className="text-white font-medium">{item.matches}</span>
                                        </p>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    <div className="mb-10">

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">International Teams</h1>
                                <p className="text-sm text-slate-400 mt-1">
                                    Explore international cricket teams
                                </p>
                            </div>

                            <span className="text-sm text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                                {internationalTeams.length} Teams
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                            {internationalTeams &&
                                internationalTeams.slice(0, 10).map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/60 hover:bg-slate-800/70 transition duration-200 group"
                                    >
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-lg">
                                                {item.name?.charAt(0)}
                                            </div>

                                            <span className="text-xs text-slate-500 uppercase tracking-wider">
                                                International
                                            </span>
                                        </div>

                                        <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                                            {item.name}
                                        </h2>

                                        <p className="text-sm text-slate-400 mt-2">
                                            Matches: <span className="text-white font-medium">{item.matches}</span>
                                        </p>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Teams
