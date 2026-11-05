import { createServer } from "http";
import app from "./app.js"
import commentWS from "./socket/commentws.js";
import connectDB from "./config/db.js";

const server = createServer(app);

server.on("upgrade",(request, socket, head)=>{
    const pathname = new URL(
        request.url,
        "http://localhost:8080"
    ).pathname;

    if(pathname === "/comment"){
        commentWS.handleUpgrade(request, socket, head, (ws)=>{
            commentWS.emit("connection",ws, request);
        })
    }
    else{
        socket.destroy();
    }
})

connectDB()
    .then(()=>{
        server.listen(8080,()=>{
            console.log("server is live")
        })
    })
    .catch((error)=>{
        
        console.log(error)
    })