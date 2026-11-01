import { createClient } from "redis";

const client = createClient({
    url : process.env.REDIS_URL
})

client.on("error",(error)=>{
    try{
        console.log("Redis error : ",error)
    }
    catch(error){
        console.log("Redis error : ")

    }
})

await client.connect();

export default client;
