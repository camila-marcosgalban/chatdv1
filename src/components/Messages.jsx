import React from 'react'

const Messages = ({ message, loggedUser }) => {
    return (
        <div className={`message ${message.from === loggedUser ? "me" : "contact"}`} >
            {message?.media ? <img src={message.media} alt={message?.text} /> : null}
            <p>{message.text}</p>
        </div>

    )
}

export default Messages