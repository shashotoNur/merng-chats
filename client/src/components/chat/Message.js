import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateMsg, deleteMsg } from "../actions/msgActions";

const Messages = () =>
{
    const dispatch = useDispatch();
    const chatMessages = useSelector(state => state.chatMessages)();

    const [updateTxt, setUpdateTxt] = useState(chatMessages);
    const [showForm, setShowForm] = useState(false);

    const onUpdateTxtChange = (event) => { setUpdateTxt(event.target.value); };

    const updateMsgTxt = (id) =>
    {
        const payload = {id, txt: updateTxt };
        dispatch( updateMsg(payload) );

        // subscribe updateTxt to server
        setShowForm(false);
    }

    const deleteMsgTxt = (id) =>
    {
        dispatch( deleteMsg(id) );

        // subscribe delete msgId to server
    }

    const showFormFn = () => setShowForm(true);

    return(
        <>
            { chatMessages.map(chatMsg => (
            <div id={ chatMsg.id }>
                <p> { chatMsg.msgTxt } </p>
                <button onClick={ showFormFn }> Edit </button>
                { showForm
                    ?
                        <form>
                            <input type='text' className='input' onChange={ onUpdateTxtChange }
                                placeholder={updateTxt} />
                            <button onClick={ updateMsgTxt(chatMsg.id) }> Update </button>
                            <button onClick={ deleteMsgTxt(chatMsg.id) }> Delete </button>
                        </form>
                    : null 
                }
            </div>
            )) }
        </>
    )
}

export default Messages;