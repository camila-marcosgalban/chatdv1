import React, { useState, useEffect } from 'react'
import { authentication, db, storage } from '../firebase/firebase.config'
// import { onAuthStateChanged } from 'firebase/auth'
// import { useNavigate } from 'react-router-dom'
import { collection, query, onSnapshot, where, addDoc, Timestamp, orderBy } from 'firebase/firestore'
import User from './User'
import Form from './Form'
import Messages from './Messages'
import NavBar from './NavBar'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


const Chat = () => {
    // let navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [chat, setChat] = useState("")
    const [text, setText] = useState("")
    const [img, setImg] = useState("")
    const [messages, setMessages] = useState("")
    const loggedUser = authentication?.currentUser?.uid;
    var bottomChat = document.getElementById("bottom");
    useEffect(() => {
        // if (!authentication?.currentUser) {
        //     return navigate("/login")
        // }
        const getUsers = collection(db, 'users')
        //consulta
        const q = query(getUsers, where('uid', 'not-in', [loggedUser]))
        //ejecutar consulta
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = []
            querySnapshot.forEach(doc => {
                users.push(doc.data())
            })
            setUsers(users)
        })
        return () => unsub()
    }, [loggedUser])
    // const [user, setUser] = useState({})
    // onAuthStateChanged(authentication, (currentUser) => {
    //     setUser(currentUser)
    // })

    const selectUser = async (user) => {
        setChat(user)
        bottomChat.scrollIntoView(true);
        const secondUser = user.uid
        const id = loggedUser > secondUser ? `${loggedUser + secondUser}` : `${secondUser + loggedUser}`

        const getMessages = collection(db, 'messages', id, 'chat')
        const q = query(getMessages, orderBy('createdAt', 'asc'))

        onSnapshot(q, querySnapshot => {
            let msgs = []
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data())
            })
            setMessages(msgs)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(chat)
        const secondUser = chat.uid
        const id = loggedUser > secondUser ? `${loggedUser + secondUser}` : `${secondUser + loggedUser}`
        console.log(secondUser)
        console.log(id)

        let url;
        if (img) {
            const imgRef = ref(storage, `images/${img.name}`)
            const sp = await uploadBytes(imgRef, img)
            const imgPath = await getDownloadURL(ref(storage, sp.ref.fullPath))
            url = imgPath
        }
        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: loggedUser,
            to: secondUser,
            media: url || "",
            createdAt: Timestamp.fromDate(new Date())
        })

        bottomChat.scrollIntoView(true);
        setText("")
        setImg("")
    }

    return (
        <div className='chat'>
            <NavBar />
            {/* <p>Cuurent user: {user?.email}</p> */}
            <div className='containerUsers'>
                {users?.map(user =>
                    <User key={user.uid} user={user} selectUser={selectUser} />
                )}
            </div>
            <div id='messages' className="messages">
                {
                    messages.length ? messages.map((message, i) => (
                        <Messages key={i} message={message} loggedUser={loggedUser} />
                    ))
                        : null
                }
                <div id="bottom"></div>
            </div>
            {
                chat !== "" ?
                    <div className='formContainer'>
                        <Form handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg} loggedUser={loggedUser} />
                    </div>
                    : null
            }

        </div>
    )
}

export default Chat