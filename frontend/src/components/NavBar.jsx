import React , { useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { deleteUser } from '../slices/userSlice'

const NavBar = () => {
    const dispatch = useDispatch();

    const user = useSelector((store)=>store.userInfo.user)
    

    async function logout(){
        try{
            await axios.get("http://localhost:3000/auth/logout",{withCredentials : true});
            dispatch(deleteUser());
        }
        catch(error){
            console.log(error.message);
        }
    } 
    return (
        <div>
            <div>
                <div>
                    <div>Gully</div>
                    <div>
                        <ul>
                            <Link to="/live">Live</Link>
                            <Link to="/stats">Stats</Link>
                            <Link to="/teams">Teams</Link>
                            <Link to="/venues">Venues</Link>
                            <Link to="/records">Records</Link>
                        </ul>
                    </div>
                </div>
                <div>
                    {
                        user ?( <>
                            <p>{user.username}</p> 
                            <button onClick={logout}>logout</button>
                        </>)
                        : <Link to="/auth">Login / Signup</Link> 
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default NavBar
