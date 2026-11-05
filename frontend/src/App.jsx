import React , { useEffect } from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { deleteUser, setUser } from './slices/userSlice'
import Stats from './pages/Stats'
import Teams from './pages/Teams'
import Records from './pages/Records'
import Venue from './pages/Venue'
import Live from './pages/Live'
import Matches from './pages/Matches'


const App = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchUser = async ()=>{
            if(document.cookie){

                try{
                    const user =await axios.get("http://localhost:8080/getuser/user", {
                        withCredentials: true
                    });
                    dispatch(setUser(user.data.user));
                }
                catch(error){
                    console.log(`${error.message}`)
                }
            }
            else{
                dispatch(deleteUser({user : "hello"}))
            }
        }
        fetchUser();
    })

    return (
        <BrowserRouter>
            
                <Routes>
                    <Route path = "/" element= {<Home/>}/>
                    <Route path = "/auth" element= {<Auth/>}/>
                    <Route path = "/stats" element= {<Stats/>}/>
                    <Route path = "/teams" element= {<Teams/>}/>
                    <Route path = "/records" element= {<Records/>}/>
                    <Route path = "/venues" element= {<Venue/>}/>
                    <Route path = "/matches" element= {<Matches/>}/>
                    <Route path = "/live/:match" element= {<Live/>}/>
                
                </Routes>

        </BrowserRouter>
    )
}

export default App
