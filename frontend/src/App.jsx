import React , { useEffect } from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from './slices/userSlice'


const App = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                console.log("hello")
                const user =await axios.get("http://localhost:3000/getuser/user", {
                    withCredentials: true
                });
                console.log("hello")
                console.log(user.data)
                dispatch(setUser(user.data.user));
            }
            catch(error){
                console.log(`${error.message}`)
            }
        }
        fetchUser();
    })

    return (
        <BrowserRouter>
            
                <Routes>
                    <Route path = "/" element= {<Home/>}/>
                    <Route path = "/auth" element= {<Auth/>}/>
                </Routes>

        </BrowserRouter>
    )
}

export default App
