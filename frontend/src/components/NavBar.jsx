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
   

<div className="w-full bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-12">

            <div className="text-2xl font-extrabold text-white tracking-tight">
                Gully<span className="text-blue-500">.</span>
            </div>

            <div>
                <ul className="flex items-center gap-8 text-sm font-medium text-slate-400">
                    <Link to="/" className="hover:text-blue-400 transition duration-200">
                        Home
                    </Link>
                    <Link to="/matches" className="hover:text-blue-400 transition duration-200">
                        Live
                    </Link>
                
                    <Link to="/stats" className="hover:text-blue-400 transition duration-200">
                        Stats
                    </Link>
                    <Link to="/teams" className="hover:text-blue-400 transition duration-200">
                        Teams
                    </Link>
                    <Link to="/venues" className="hover:text-blue-400 transition duration-200">
                        Venues
                    </Link>
                    <Link to="/records" className="hover:text-blue-400 transition duration-200">
                        Records
                    </Link>
                </ul>
            </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
            {
                user ? (
                    <>
                        <p className="text-white font-medium">
                            {user.username}
                        </p>

                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-red-500/10 hover:text-red-400 border border-slate-700 transition duration-200"
                        >
                            Logout
                        </button>
                    </>
                )
                : (
                    <Link
                        to="/auth"
                        className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200"
                    >
                        Login / Signup
                    </Link>
                )
            }
        </div>

    </div>
</div>

    )
}

export default NavBar
