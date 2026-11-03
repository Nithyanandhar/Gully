import React from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { useState } from 'react'

const Records = () => {
    const [record,setrecord] = useState();
    const [array,setarray] = useState([]);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        const type = e.target.type.value;
        const format = e.target.format.value;
        const gender = e.target.gender.value;
      
        const response = await axios.post("http://localhost:3000/records",
            {
                ...(format && {"format" : format}),
                ...(type && {"type" : type}),
                ...(gender && {"gender" : gender})
            },
            {withCredentials : true}
        )
        const records = response.data;
        setrecord(records.data);
        const data = records.data;
        
        const result = (Array.isArray(data?.data) ? data?.data?.data : data?.data?.data?.data)
        setarray(result)
        console.log(records.data.data.data)
      
    }

    return (

        // <div>
        //     <NavBar/>
        //     <div>
        //         <form onSubmit={(e)=>handleSubmit(e)}>
        //             <label>Type</label>
        //             <select name='type'>
        //                 <option value=""></option>
        //                 <option value="most-runs">Most Runs</option>
        //                 <option value="most-wickets">Most Wickets</option>
        //                 <option value="highest-scores">Highest Scores</option>
        //                 <option value="best-bowling">Best Bowling</option>
        //                 <option value="team-totals">Team Totals</option>
        //             </select>

        //             <label>Category</label>
        //             <select name='format'>
        //                 <option value=""></option>
        //                 <option value="test">Test</option>
        //                 <option value="odi">ODI</option>
        //                 <option value="t20i">T20 International</option>
        //                 <option value="t20">T20</option>
        //                 <option value="multi-day">Multi Day Totals</option>
        //                 <option value="one-day">One Day</option>
        //             </select>

        //             <label>Gender</label>
        //             <select name='gender'>
        //                 <option value=""></option>
        //                 <option value="male">Male</option>
        //                 <option value="female">Female</option>
        //             </select>
        //             <button>Search</button>
        //         </form>
        //     </div>

        //     <div>
        //         { record &&
                
        //             record.data.data.map((records, index)=>(
        //                 <div key={index}>
        //                     {Object.keys(records).map((key)=>(
        //                         <div key={key}>
        //                             <p>{key} : {records[key]}</p>
        //                         </div>
        //                     ))
        //                     }
                            
        //                 </div>
        //             ))
        //         }
        //     </div>
        // </div>

        <div className="min-h-screen bg-slate-950 text-white">
    <NavBar/>

    <div className="mx-auto max-w-6xl px-4 py-8">
        <form
            onSubmit={(e)=>handleSubmit(e)}
            className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl md:grid-cols-4"
        >
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                    Type
                </label>

                <select
                    name="type"
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                    <option value=""></option>
                    <option value="most-runs">Most Runs</option>
                    <option value="most-wickets">Most Wickets</option>
                    <option value="highest-scores">Highest Scores</option>
                    <option value="best-bowling">Best Bowling</option>
                    <option value="team-totals">Team Totals</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                    Category
                </label>

                <select
                    name="format"
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                    <option value=""></option>
                    <option value="test">Test</option>
                    <option value="odi">ODI</option>
                    <option value="t20i">T20 International</option>
                    <option value="t20">T20</option>
                    <option value="multi-day">Multi Day Totals</option>
                    <option value="one-day">One Day</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                    Gender
                </label>

                <select
                    name="gender"
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div className="flex items-end">
                <button
                    className="w-full rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-400 active:scale-[0.98]"
                >
                    Search
                </button>
            </div>
        </form>
    </div>

    <div className="mx-auto max-w-6xl px-4 pb-10">
        {record &&
        
            array.map((records, index)=>(
                <>
               
                <div
                    key={index}
                    className="mb-4 rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:border-slate-700"
                >
                    {Object.keys(records).map((key)=>(
                        <div
                            key={key}
                            className="flex items-center justify-between border-b border-slate-800 py-3 last:border-b-0"
                        >
                            <p className="text-sm font-medium capitalize text-slate-400">
                                {key}
                            </p>

                            <p className="text-sm font-semibold text-white">
                                {records[key]}
                            </p>
                        </div>
                    ))
                    }
                    
                </div>
                </>
            ))
        }
    </div>
</div>
    )
}

export default Records
