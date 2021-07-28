const ChatMessage = require('../models/chatMessageModel');
const { pubsub } = require('../config/app.js');

const getChatMessages = async ({ chatMessageIds }) =>
{
    try
    {
        const chatMessages = await ChatMessage.find({ id: chatMessageIds });
        return chatMessages;
    }
    catch (err) { return { status: err.message }; };
};

const createMessage = async ({ threadId, sender, msgTxt}) =>
{
    try
    {
        let message = await ChatMessage.create({ sender, threadId, msgTxt });
        pubsub.publish(threadId, { message, type: 'CREATE' });

        message.status = "Message successfully created!";

        return message;
    }
    catch (err) { return { status: err.message }; };
};

const updateMessage = async ({ threadId, msgId, msgTxt }) =>
{
    try
    {
        let message = await ChatMessage.findByIdAndUpdate(msgId, { msgTxt });
        pubsub.publish(threadId, { message, type: 'UPDATE' });

        message.status = "Message successfully updated!";

        return message;
    }
    catch (err) { return { status: err.message }; };
};

const deleteMessage = async ({ threadId, msgId }) =>
{
    try
    {
        let message = await ChatMessage.findByIdAndDelete(msgId);
        pubsub.publish(threadId, { message, type: 'DELETE' });
        
        message.status = "Message successfully deleted!";

        return message;
    }
    catch (err) { return { status: err.message }; };
};

module.exports = { getChatMessages, createMessage, updateMessage, deleteMessage };