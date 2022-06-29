import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { authentication, db } from '../firebase/firebase.config'
import { doc, updateDoc } from 'firebase/firestore'

const SignOut = () => {
    let navigate = useNavigate()
    const logOut = async () => {
        await updateDoc(doc(db, "users", authentication.currentUser.uid), {
            online: false,
        })
        await signOut(authentication)
        return navigate("/login")
    }
    return (
        <div>
            <button className='navItem' onClick={logOut}>Sign out</button>
        </div>
    )
}

export default SignOut