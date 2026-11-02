import React from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'

const Records = () => {
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
        console.log(records)
    }

    return (

        <div>
            <NavBar/>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label>Type</label>
                <select name='type'>
                    <option value=""></option>
                    <option value="most-runs">Most Runs</option>
                    <option value="most-wickets">Most Wickets</option>
                    <option value="highest-scores">Highest Scores</option>
                    <option value="best-bowling">Best Bowling</option>
                    <option value="team-totals">Team Totals</option>
                </select>

                <label>Category</label>
                <select name='format'>
                    <option value=""></option>
                    <option value="test">Test</option>
                    <option value="odi">ODI</option>
                    <option value="t20i">T20 International</option>
                    <option value="t20">T20</option>
                    <option value="multi-day">Multi Day Totals</option>
                    <option value="one-day">One Day</option>
                </select>

                <label>Gender</label>
                <select name='gender'>
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button>Search</button>
            </form>
        </div>
    )
}

export default Records
