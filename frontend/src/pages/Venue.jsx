import React, { useState , useEffect } from 'react'
import NavBar from "../components/NavBar"
import axios from 'axios'

const Venue = () => {

    const [venuedetails, setvenuedetails] = useState();
    const [venues , setvenues] = useState();
    const [empty , setempty] = useState(false);

    useEffect(()=>{
        async function fetchvenues(){

            const response = await axios.get(`http://localhost:8080/venues`);
            const venues = response.data;
    
            setvenues(venues.data.data.data.data.data);
            
        }
        fetchvenues();

    },[])

    const handleSearch = async(e) => {
        e.preventDefault();
        const venue = e.target.venue.value;

        if(venue === ""){
            setempty(true);
            return;
        }
        
        const response = await axios.get(`http://localhost:8080/venues/${venue}`)
        
        const venueresponse = response.data;
        
        setvenuedetails(venueresponse);
        setempty(false);

    }

    return (
    
        <>
            <div className="min-h-screen bg-slate-950 text-white">
                <NavBar />

                <div className="mx-auto max-w-6xl px-4 py-8">
            
                    <form
                        onSubmit={(e) => handleSearch(e)}
                        className="mx-auto flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:flex-row sm:items-start"
                    >
                        <div className="flex-1">
                            <input
                                type="text"
                                name="venue"
                                placeholder="Search cricket venue..."
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />

                            {empty && (
                                <p className="mt-2 flex items-center gap-2 text-xs font-medium text-red-400">
                                    Please enter a venue name.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-3 text-sm font-bold text-slate-950 transition-all duration-200 hover:bg-emerald-400 active:scale-95"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="mx-auto max-w-6xl space-y-8 px-4 pb-12">
                    {
                        venuedetails &&
                        <div className="space-y-8">

                            {/* Venue */}
                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                                    Venue
                                </p>
                                <h1 className="text-3xl font-bold capitalize">
                                    {venuedetails.data.data.city}
                                </h1>
                            </div>

                        
                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                                <h2 className="mb-5 text-xl font-bold text-emerald-400">
                                    Most Runs
                                </h2>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {
                                        venuedetails.data.data.most_runs.map((player,index)=>(
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/60 p-4 transition hover:border-emerald-500/50 hover:bg-slate-800"
                                            >
                                                <p className="font-medium text-slate-200">
                                                    {player.name}
                                                </p>
                                                <p className="text-lg font-bold text-emerald-400">
                                                    {player.runs}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                                <h2 className="mb-5 text-xl font-bold text-emerald-400">
                                    Highest Total
                                </h2>

                                <div className="grid gap-4 md:grid-cols-2">
                                    {
                                        venuedetails.data.data.highest_totals.map((team,index)=>(
                                            <div
                                                key={index}
                                                className="rounded-xl border border-slate-800 bg-slate-800/60 p-5 transition hover:border-emerald-500/50"
                                            >
                                                <h3 className="mb-4 text-lg font-bold text-white">
                                                    {team.team}
                                                </h3>

                                                <div className="mb-4 flex items-center gap-2">
                                                    <span className="text-3xl font-bold text-emerald-400">
                                                        {team.runs}/{team.wickets}
                                                    </span>
                                                    <span className="text-sm text-slate-400">
                                                        Overs: {team.overs}
                                                    </span>
                                                </div>

                                                <div className="border-t border-slate-700 pt-3">
                                                    <p className="text-sm text-slate-400">
                                                        Match Date
                                                    </p>
                                                    <p className="mt-1 text-sm font-medium text-slate-200">
                                                        {team.date}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                                <h2 className="mb-5 text-xl font-bold text-emerald-400">
                                    Matches By Category
                                </h2>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {
                                        Object.keys(venuedetails.data.data.matches_by_format).map((team,index)=>(
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/60 p-4 transition hover:border-emerald-500/50"
                                            >
                                                <p className="font-medium capitalize text-slate-300">
                                                    {team}
                                                </p>

                                                <p className="text-xl font-bold text-emerald-400">
                                                    {venuedetails.data.data.matches_by_format[team]}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    }

                    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-8">
                        <div className="mx-auto max-w-7xl">

                            <div className="mb-8">
                                <h2 className="text-3xl font-bold tracking-tight">
                                    Cricket Venues
                                </h2>
                                <p className="mt-2 text-sm text-slate-400">
                                    Explore cricket grounds and stadiums around the world.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {
                                    venues &&
                                    venues.slice(0, 20).map((venue) => (
                                        <div
                                            key={venue.venue}
                                            className="group rounded-xl border border-slate-800 bg-slate-900 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-800"
                                        >
                                            <div className="mb-5 flex items-start justify-between">
                                                <div className="rounded-lg bg-emerald-500/10 p-3">
                                                    <span className="text-2xl">🏟️</span>
                                                </div>

                                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-emerald-400">
                                                    Stadium
                                                </span>
                                            </div>

                                            <h3 className="mb-2 text-lg font-semibold text-white transition group-hover:text-emerald-400">
                                                {venue.name}
                                            </h3>

                                            <p className="mb-5 flex items-center gap-2 text-sm text-slate-400">
                                                <span>📍</span>
                                                {venue.city}
                                            </p>

                                            <div className="border-t border-slate-800 pt-4">
                                                <p className="text-xs uppercase tracking-wider text-slate-500">
                                                    Matches hosted
                                                </p>

                                                <p className="mt-1 text-2xl font-bold text-emerald-400">
                                                    {venue.matches}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Venue
