import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateMsg, deleteMsg } from "../actions/msgActions";

const Messages = () =>
{
    const dispatch = useDispatch();
    const txt = useSelector(state => state.msgTxt)();
    const [updateTxt, setUpdateTxt] = useState(txt);

    const onUpdateTxtChange = (event) => { setUpdateTxt(event.target.value); };

    const updateMsgTxt = () =>
    {
        dispatch( updateMsg() );

        // post updateTxt to server
        // hide form
    }

    const deleteMsgTxt = () =>
    {
        dispatch( deleteMsg() );

        // post delete msgId to server
        // hide form
    }

    const showForm = () =>
    {

    }

    return(
        <div>
            { txt }
            <button onClick={ showForm }> Edit </button>
            <form>
                <input type='text' className='input' onChange={ onUpdateTxtChange } placeholder={updateTxt} />
                <button onClick={ updateMsgTxt }> Update </button>
                <button onClick={ deleteMsgTxt }> Delete </button>
            </form>
        </div>
    )
}

export default Messages;