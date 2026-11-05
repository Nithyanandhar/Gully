import NavBar from '../components/NavBar'
import Match from '../components/Match'
import axios from 'axios'
import { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Live = () => {

    const {match} = useParams();

    const [socket , setsocket]=useState(null)
    const [comments , setcomments]=useState([])

    const user = useSelector((store)=>store.userInfo.user)


    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:8080/comment")
        ws.onopen = ()=>{
            console.log("connected to web socket")
            ws.send(JSON.stringify({
                type : "join",
                roomId : "india vs australia"
            }))
        }
        ws.onmessage = (event)=> { 
            const data = JSON.parse(event.data)
            const dbdata = {
                type : "chat",
                message : data,
                roomId : "india vs australia",
                sender : user
            }
            console.log("messaging",event.data)
            setcomments((prev)=>[...prev,dbdata])
        }
        ws.onclose = (event)=> { 
            console.log("Closing",event.code)
        }
        ws.onerror = (error)=> { 
            console.log("error",error)
        }
        setsocket(ws)
        async function getPreviousComments(){
            const comments = await axios.get(`http://localhost:8080/comments/india vs australia`)
            setcomments(comments.data.data);
            console.log(comments.data.data);
        }
        getPreviousComments();
        
        return () => {
            ws.close();
        }
    },[])
    
    function handleSubmit(e){
        e.preventDefault();
        
        const message = e.target.message.value;
        
        if(!message)return ;
        if(!socket || !socket.readyState === WebSocket.OPEN)return;
        const dbdata = {
            type : "chat",
            message : message,
            roomId : "india vs australia",
            sender : user
        }
        socket.send(JSON.stringify(dbdata))
        e.target.message.value="";
  
    }
    
    return (
    

        <div className="min-h-screen bg-slate-950 text-white">
    <NavBar />

    <div className="max-w-5xl mx-auto px-4 py-6">
        <Match />

        {/* Chat section */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

            {/* Chat header */}
            <div className="px-5 py-4 border-b border-slate-800">
                <h2 className="text-lg font-semibold">Live Match Chat</h2>
                <p className="text-sm text-slate-400">
                    Discuss the match with other fans
                </p>
            </div>

            {/* Messages */}
            <div className="h-[450px] overflow-y-auto p-5 space-y-4">
                {comments.map((comment, index) => (
                    <div key={comment._id || index} className="flex">
                        <div className="max-w-[75%] bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm">
                            <p className="text-sm text-slate-200">
                                {comment.message}
                            </p>
                        </div>
                    </div>
                ))}

                {comments.length === 0 && (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-slate-500 text-sm">
                            No messages yet. Start the conversation!
                        </p>
                    </div>
                )}
            </div>

            {/* Message input */}
            <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-slate-800 flex gap-3"
            >
                <input
                    type="text"
                    name="message"
                    placeholder="Type your message..."
                    autoComplete="off"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 active:scale-95 px-6 py-3 rounded-xl font-medium text-sm transition-all"
                >
                    Send
                </button>
            </form>
        </div>
    </div>
</div>
    )
}

export default Live
