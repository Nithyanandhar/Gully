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


const App = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchUser = async ()=>{
            if(document.cookie){

                try{
                    const user =await axios.get("http://localhost:3000/getuser/user", {
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
                </Routes>

        </BrowserRouter>
    )
}

export default App
