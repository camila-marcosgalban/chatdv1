import React from 'react'
import { Link } from 'react-router-dom'
import SignOut from './SignOut'

const NavBar = () => {
    return (
        <div className='Navbar'>
            <Link className='navItem' to="/" ><h1>ChatDV</h1></Link>
            <div className="profile">
                <button>
                    <Link className='navItem' to="/profile" >Profile</Link>
                </button>
            </div>
            <div className="logout">
                <SignOut />
            </div>
        </div>
    )
}

export default NavBar