import { WebSocketServer , WebSocket } from "ws";
import Comments from "../models/Comments.js"


const rooms = new Map([
    ["india vs australia", new Set()],
    ["csk vs mi", new Set()],
    ["england vs pakistan", new Set()]
]);


const commentWS = new WebSocketServer({noServer : true})

function joinRoom(roomId, socket){
    try{
        if(!rooms.has(roomId)){
        socket.send(JSON.stringify("No match found"))
        return;
        }
        leaveRoom(roomId,socket);

        rooms.get(roomId).add(socket);

        socket.roomId = roomId;

        return socket.send(JSON.stringify(`${roomId} joined`))
    }
    catch(error){ 
        console.log(error);
        socket.send(JSON.stringify(error));
    }
}
function leaveRoom(roomId, socket){
    try{
        if(!roomId)return;
        const room = rooms.get(roomId);

        room.delete(socket);

        socket.roomId=null;

        return;
    }
    
    catch(error){
        console.log(error);
        socket.send(JSON.stringify(error));
    }
}
async function broadcast(socket, message){
    try{
            const roomId = socket.roomId;
            if(!roomId){
               return socket.send(JSON.stringify("Join room to chat"))
            }
        
            const room = rooms.get(roomId);
        
            room.forEach((client)=>{
                if(client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify(message));
                }
            })
        
            const dbcomment = new Comments({
                roomId : roomId,
                message : message,
                sender : "672a1b2c3d4e5f6789012345"
            })
        
            await dbcomment.save();
            return;
    }
    catch(error){
        console.log(error);
    socket.send(JSON.stringify(error));
    }

    
}

commentWS.on("connection",(socket,request)=>{
    
    socket.on("message",(data)=>{
        try{
            const parsedData = JSON.parse(data);
            if(parsedData.type==="join"){
                joinRoom(parsedData.roomId, socket);
            }
            if(parsedData.type==="chat"){
                broadcast(socket, parsedData.message);
            }
        }
        catch(error){
            socket.send(JSON.stringify("Error"))
        }
    })
    socket.on("close",(socket)=>{
        
            leaveRoom(socket.roomId,socket)
    })
    socket.on("error",(error)=>{
        console.log(error)
    })
})

export default commentWS;