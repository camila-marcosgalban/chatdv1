import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { authentication } from '../firebase/firebase.config'
import SignIn from "./SignIn"

const Authenticate = () => {
    let logged = authentication?.currentUser?.uid

    return logged === undefined ? <SignIn /> : <Outlet />
}

export default Authenticate

