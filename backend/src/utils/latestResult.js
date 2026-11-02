import axios from "axios";
import Latest from "../models/Latest.js";


const latestResult = async ()=>{
    try{
        const key = "db:latest"

        const dblatest = await Latest.findOne({key : key})
        if(dblatest){
            return dblatest.data
        }
        const response = await axios.get("https://api.cricketdatabase.com/v1/results/yesterday", {
            headers: { Authorization: process.env.CRICKET_API },});
            
        const latestdata = new Latest({
            key : key,
            data : response.data
        })   

        await latestdata.save();

        return response.data
    }
    catch(error){
       console.log(error.message)
    }
}

export default latestResult;