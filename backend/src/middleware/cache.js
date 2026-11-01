import client from "../config/redis.js";

const cache = (duration) =>{
    return async (req , res , next) => {
        try{
            if (!client.isReady) {
            console.log("Redis unavailable. Skipping cache.");
            return next();
        }
            const key = `cache:${req.originalUrl}`
            console.log(key)
            const start = performance.now();



            const cachedata = await client.get(key);


            const end = performance.now();
            if(cachedata){
                console.log("cache hit");

                console.log("Redis GET time:", (end - start).toFixed(3), "ms");
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