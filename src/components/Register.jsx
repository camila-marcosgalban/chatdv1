import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { authentication, db } from '../firebase/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

const Register = () => {
    let navigate = useNavigate()
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const register = async () => {
        try {
            //primero authentication para saber a donde va
            const user = await createUserWithEmailAndPassword(authentication, registerEmail, registerPassword)
            console.log(user)
            await setDoc(doc(db, 'users', user.user.uid), {
                uid: user.user.uid,
                name: registerName,
                email: registerEmail,
                online: true,
                createdAt: Timestamp.fromDate(new Date())
            })
            //clear fields
            setRegisterEmail("")
            setRegisterName("")
            setRegisterPassword("")
            //return tu chat
            return navigate("/")
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <div className='container logins'>
            <input type="text" placeholder='Username...' onChange={(event) => { setRegisterName(event.target.value) }} />
            <input type="text" placeholder='Email...' onChange={(event) => { setRegisterEmail(event.target.value) }} />
            <input type="password" placeholder='Password...' onChange={(event) => { setRegisterPassword(event.target.value) }} />
            <button onClick={register}>Register</button>
            <div className='logins'>
                <button> <Link to="/" className='link' >Login</Link></button>
            </div>
        </div >
    )
}

export default Register