import Latest from "../models/Latest.js";
import Stats from "../models/Stats.js";
import Records from "../models/Records.js";
import axios from "axios";

const upadateData = async() => {
    try{
        const format = "test";
        const type = "most-runs" ;
        const gender = ["any" , "male" , "female"]

        const response = await axios.get(`https://api.cricketdatabase.com/v1/records`, {
                headers: { Authorization: "Bearer cdb_live_003fd370b5c62af56233d2853d1bd085" }, });

        console.log(response.data.data);
        console.log(response.data);
        }
        catch(error){
            console.log(error)
    }
}

upadateData();

export default upadateData();