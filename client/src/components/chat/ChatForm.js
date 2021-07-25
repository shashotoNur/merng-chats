import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addMsg } from "../actions/msgActions";

const ChatForm = () =>
{
    const dispatch = useDispatch();

    const [msgTxt, setMsgTxt] = useState('');

    const onUpdateMsgChange = (event) => { setMsgTxt(event.target.value); };

    const sendMsg = () =>
    {
        dispatch( addMsg() );

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