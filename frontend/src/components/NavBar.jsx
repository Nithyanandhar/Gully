import React from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

const NavBar = () => {

    const user = useSelector((store)=>store.userInfo.user)
    console.log(user.username);
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
                        user ? <p>{user.username}</p> : <Link to="/auth">Login / Signup</Link> 
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default NavBar
