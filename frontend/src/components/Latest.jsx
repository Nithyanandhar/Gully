import React , { useEffect, useState } from 'react'
import axios from "axios"

const Latest = () => {
    const [latestarr, setlatestarr] = useState([])
    useEffect(()=>{
        async function fetchLatest(){
            const response = await axios.get("http://localhost:3000/");
            setlatestarr(response.data.data.data.data.results)
        }
        fetchLatest();
    },[])

    return (
        <div  className="min-h-screen w-full bg-slate-950 p-6">
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-5 py-4 shadow-lg">
                <span className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></span>

                <h2 className="text-xl font-bold tracking-wide text-white">
                    Latest News
                </h2>

                <span className="ml-auto rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-blue-400">
                    GULLY UPDATES
                </span>
            </div>
           
            <div className="w-full overflow-hidden bg-slate-950 py-4">
                <div className="flex w-max animate-marquee gap-5">

                    {latestarr.map((news, index) => (
                        <div
                            key={index}
                            className="w-80 shrink-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
                        >
                            <h3 className="text-lg font-bold text-white">
                                {news.match}
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                {news.date}
                            </p>

                            <div className="mt-4 flex gap-2">
                                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                                    {news.format}
                                </span>

                                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                                    {news.gender}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Duplicate cards for continuous scrolling */}
                    {latestarr.map((news, index) => (
                        <div
                            key={`duplicate-${index}`}
                            className="w-80 shrink-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
                        >
                            <h3 className="text-lg font-bold text-white">
                                {news.match}
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                {news.date}
                            </p>

                            <div className="mt-4 flex gap-2">
                                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                                    {news.format}
                                </span>

                                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                                    {news.gender}
                                </span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            
        </div>
    )
}

export default Latest
