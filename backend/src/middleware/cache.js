import client from "../config/redis.js";

const cache = (duration) =>{
    return async (req , res , next) => {
        try{
            
            const key = `cache:${req.originalUrl}`

            const cachedata = await client.get(key);
    
            if(cachedata){
                
                return res
                    .json({
                        data : JSON.parse(cachedata),
                        from : "cache",
                        message : "data sent from the cache"
                    })
            }

            const jsonoverride = res.json.bind(res);

            res.json = async (data) => {
                console.log("overriden");
                await client.set(key,JSON.stringify(data),{EX : duration})

                return jsonoverride(data);
            }

            next();
        }
        catch(error){
            console.log("Redis error : ",error)
            next();
        }
    }
}

export default cache;