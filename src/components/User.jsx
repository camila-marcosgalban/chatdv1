import React from 'react'

const User = ({ user, selectUser }) => {
    const defaultImg = 'https://picsum.photos/200'
    // console.log(user)
    return (
        <div className="user" onClick={() => selectUser(user)}>
            <div className='userListImg'>
                <img src={user.profilePic || defaultImg} alt={user.name} />
            </div>
            <p>{user.name}</p>
            <div className={`status ${user.online ? 'online' : 'offline'}`}></div>
        </div>
    )
}

export default User