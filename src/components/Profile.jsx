import React, { useEffect, useState } from 'react'
import { authentication, db, storage } from '../firebase/firebase.config'
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import NavBar from './NavBar'
// import { useNavigate } from 'react-router-dom'
const Profile = () => {
    // let navigate = useNavigate()
    const [img, setImg] = useState("")
    const [user, setUser] = useState()
    const defaultImg = 'https://picsum.photos/200'
    useEffect(() => {
        // if (!authentication?.currentUser) {
        //     return navigate("/login")
        // }
        getDoc(doc(db, 'users', authentication?.currentUser?.uid)).then(snap => {
            if (snap.exists) {
                setUser(snap.data())
            }
        })
        if (img) {
            const uploadProfile = async () => {
                const imgRef = ref(
                    storage, `profile/${img.name}`);
                try {
                    if (user.profilePicPath) {
                        await deleteObject(ref(storage, user.profilePicPath))
                    }
                    const sp = await uploadBytes(imgRef, img);
                    console.log(sp.ref.fullPath)
                    const url = await getDownloadURL(ref(storage, sp.ref.fullPath))
                    console.log(url)
                    await updateDoc(doc(db, 'users', authentication?.currentUser?.uid), {
                        profilePic: url,
                        profilePicPath: sp.ref.fullPath,
                    })
                    setImg("")
                } catch (error) {
                    console.log(error.message)
                }

            }
            uploadProfile();
        }
    }, [img])
    return (
        <div className='profileContainer'>
            <NavBar />
            <div className='profileDataContainer'>
                <div className='profilePicture'>
                    <img src={user?.profilePic || defaultImg} alt={user?.name} />
                    <div>
                        <label htmlFor="profilePic">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                        </label>
                        <input type="file" accept='image/*' id="profilePic" onChange={e => setImg(e.target.files[0])} style={{ display: "none" }} />
                    </div>
                </div>
                <div className='profileInfo'>
                    <h3>Name</h3>
                    <p>{user?.name}</p>
                    <h3>Email</h3>
                    <p>{user?.email}</p>
                    <p>Since {user?.createdAt?.toDate().toDateString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile