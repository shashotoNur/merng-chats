import React, { useState } from 'react';

const ChatForm = () =>
{
    const [msgTxt, setMsgTxt] = useState('');

    const onUpdateMsgChange = (event) => { setMsgTxt(event.target.value); };

    const sendMsg = () =>
    {

        // subscribe new msg to server
    }

    return(
        <div>
            <form>
                <input type='text' className='input' onChange={ onUpdateMsgChange } placeholder={msgTxt} />
                <button onClick={ sendMsg }> Send </button>
            </form>
        </div>
    )
}

export default ChatForm;