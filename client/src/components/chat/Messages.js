import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useQuery } from '@apollo/client';

import { getChatThreadQuery, threadChangeSubscription } from '../../queries/chatQueries';

const Messages = () =>
{
    const location = useLocation();
    const path = location.pathname;
    const otherUser = /[^/]*$/.exec(path)[0];

    const { subscribeToMore, loading, error, data: msgData } = useQuery(getChatThreadQuery,
                                                { variables: { user:1, otherUser } });

    const [chatMessages, setChatMessages] = useState(msgData.getChatThreadQuery.chatMessages);
    const [updateTxt, setUpdateTxt] = useState('');
    const [showForm, setShowForm] = useState(false);

    const onUpdateTxtChange = (event) => { setUpdateTxt(event.target.value); };

    const updateMsgTxt = (id) =>
    {
        // subscribe updateTxt to server
        setShowForm(false);
    }

    const deleteMsgTxt = (id) =>
    {
        // subscribe delete msgId to server
    }

    const showFormFn = (msgId) =>
    {
        setShowForm(true);
    }

    useEffect(() =>
    {
        const updateChatMessages = (chatMessage) =>
        {
            const { id } = chatMessage;
            console.log(id)

            // let updatedMsgState = state.msgs.filter(
            //     msg =>
            //     {
            //         if(msg.id === action.id) msg.txt = action.txt;
            //         return msg;
            //     }
            // );
            // return { msgs: updatedMsgState};
        }
    
        const deleteChatMessages = (chatMessage) =>
        {
            const { id } = chatMessage;
            console.log(id)

            // let remainingMsgs = state.msgs.filter(
            //     msg => { return msg.id !== action.id }
            // );
            // return { msgs: remainingMsgs};
        }

        (() => subscribeToMore(
            {
                document: threadChangeSubscription,
                variables: { variables: { user:1, otherUser } },

                updateQuery: (prev, { subscriptionData }) =>
                {
                    if (!subscriptionData.data) return prev;

                    const { chatMessage, type } = subscriptionData.data;

                    switch (type) {
                        case 'CREATE':
                            setChatMessages(...chatMessages, chatMessage);
                            break;
                        case 'UPDATE':
                            updateChatMessages(chatMessage);
                            break;
                        case 'DELETE':
                            deleteChatMessages(chatMessage);
                            break;
                        default:
                            console.log("Unknown type:",type)
                            break;
                    }
                }
            }
        ))();
    }, [chatMessages, otherUser, subscribeToMore]);

    if(loading) console.log('Getting messages...');
    if(error) console.log(error);
    return(
        <>
            { chatMessages.map(chatMsg => (
                <div id={ 'div-' + chatMsg.id }>
                    <p> { chatMsg.msgTxt } </p>
                    <button onClick={ showFormFn(chatMsg.id) }> Edit </button>
                    { showForm
                        ?
                            <form>
                                <input type='text' className='input' onChange={ onUpdateTxtChange }
                                    id={ chatMsg.id } placeholder={updateTxt} />
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