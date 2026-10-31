import React from 'react'
import { Link } from "react-router-dom"

const NavBar = () => {
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
                    <Link to="/auth">Login / Signup</Link> 
                </div>
            </div>
        </div>
    )
}

export default NavBar
