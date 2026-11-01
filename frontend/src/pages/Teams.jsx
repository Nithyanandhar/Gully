import React, { useState , useEffect } from 'react'
import axios from "axios"

const Teams = () => {

    const [clubTeams , setclubTeams] = useState([]);
    const [internationalTeams , setinternationalTeams] = useState([]);
    const [teams , setteams] = useState([]);
    useEffect(()=>{
        getTeams();
    },[])
    async function getTeams(){
        const response = await axios.get("http://localhost:3000/teams/");

        setteams(response.data.data);

        setclubTeams(teams.filter((team)=>team.type === "club"))
        setinternationalTeams(teams.filter((team)=>team.type === "international"))
        
    }
    async function handleSearch(event){
        try{
            event.preventDefault();
            const team = event.target.team.value;
            const teamDetails =await axios.get(`http://localhost:3000/teams/${team}`)
            console.log(teamDetails.data)
        }
        catch(error){
            console.log(error.message)
        }
    }


    return (
        <div>
            <h1>TEAMS</h1>
                <div>
                    <h2>International Teams</h2>
                    <form onSubmit={(e)=>handleSearch(e)}>
                        <input type='text' name="team" placeholder='Enter a team'/>
                        <button >Search</button>
                     
                    </form>
                </div>


        
        </div>
    )
}

export default Teams
