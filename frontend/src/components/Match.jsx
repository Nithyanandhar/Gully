import React, { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


const Match = () => {

    const [matchdetails , setmatchdetails] =useState();

    const {match} = useParams();

    useEffect(()=>{
        async function fetchData(){
            const response = await axios.get(`http://localhost:8080/matches/${match}`);

            setmatchdetails(response.data.data.data.data);
            console.log(response.data.data.data.data)
        }
        fetchData();
    },[])
    return (
        <div>
            {
                matchdetails &&
                <div>
                    {
                        Object.keys(matchdetails).map((key)=>(
                            <div key={key}>{
                                key === "match" ?   (<p>{key} : {matchdetails[key]}</p>) : null                               
                                
                              
                            }
                            </div>
                        ))
                    }
                </div>
            }
            
        </div>
    )
}

export default Match
