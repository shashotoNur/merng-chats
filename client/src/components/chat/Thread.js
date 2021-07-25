import React from 'react';
import { useDispatch } from "react-redux";
import { useQuery } from '@apollo/client';

import { addMsg } from "../actions/msgActions";
import { getChatThreadQuery } from '../../queries/chatQueries';

import Messages from './Message';
import ChatForm from './ChatForm';

const Thread = () =>
{
    const dispatch = useDispatch();
    const { loading, error, data: msgData } = useQuery(getChatThreadQuery);

    msgData?.getChatThreadQuery && dispatch( addMsg(msgData.getChatThreadQuery.chatMessages) );

    if(loading) console.log('Getting Messages...');
    if(error) console.log(error);
    return(
        <div>
            <Messages />
            <ChatForm />
        </div>
    )
}

export default Thread;