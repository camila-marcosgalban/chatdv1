import React from 'react'

const Form = ({ handleSubmit, text, setText, setImg }) => {
    return (
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder='Message...' value={text} onChange={e => setText(e.target.value)} />
            </div>
            <div>
                <label htmlFor="image">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                </label>
            </div>
            <input type="file" id="image" accept='image/*' style={{ display: 'none' }} onChange={e => setImg(e.target.files[0])} />
            <button className='sendBtn'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </form>
    )
}

export default Form