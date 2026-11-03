import axios from "axios"
import Players from "../models/Players.js";


const playerData = async() => {
    try{    
        const key = "db:players"
        const players = await Players.findOne({key : key})
        if(players){
          
            return players.data;
        }
        const response = await axios.get(`https://api.cricketdatabase.com/v1/players?limit=20`, {
            headers: { Authorization: process.env.CRICKET_API },
        })
        
        const dbcacheplayers = new Players({
            key : key,
            data : response.data
        })
        
    
        await dbcacheplayers.save();
        return response.data;
    }
    catch(error){
        return;
    }
}

export default playerData;