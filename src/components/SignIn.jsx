import React, { useState } from 'react'
import { authentication, db } from '../firebase/firebase.config';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';

const SignIn = () => {
    let navigate = useNavigate()
    //google
    function signInWithGoogle() {
        //popup window
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then((res) => {
                console.log(res.user)
                const docRef = doc(db, "users", res.user.uid);
                const docSnap = getDoc(docRef);
                if (docSnap.exists) {
                    console.log("User exists");
                } else {
                    setDoc(doc(db, 'users', res.user.uid), {
                        uid: res.user.uid,
                        name: res.user.displayName,
                        email: res.user.email,
                        online: true,
                        profilePic: res.user.photoURL,
                        createdAt: Timestamp.fromDate(new Date())
                    })
                }
                return navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }



    //firebase
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const Login = async () => {
        try {
            const user = await signInWithEmailAndPassword(authentication, loginEmail, loginPassword)
            console.log(user)
            await updateDoc(doc(db, "users", user.user.uid), {
                online: true
            })
            return navigate("/")
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='container'>
            <div className="logins">
                <input type="text" placeholder='Email...' onChange={(event) => { setLoginEmail(event.target.value) }} />
                <input type="password" placeholder='Password...' onChange={(event) => { setLoginPassword(event.target.value) }} />
                <button onClick={Login}>Login</button>
            </div>
            <div className='logins'>
                <button> <Link to="/register" className='link' >Register</Link></button>
            </div>
            <div className="logins">
                <button onClick={signInWithGoogle}>Sign in with google</button>
            </div>
        </div>
    )
}

export default SignIn