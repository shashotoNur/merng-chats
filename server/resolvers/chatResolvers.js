const ChatMessage = require('../models/chatMessageModel');

const getChatMessages = async ({ chatMessageIds }) =>
{
    try
    {
        const chatMessages = await ChatMessage.find({ id: chatMessageIds });
        return chatMessages;
    }
    catch (err) { return { status: err.message }; };
};

const createMessage = async ({ threadId, sender, msgTxt}, { pubsub }) =>
{
    try
    {
        let message = await ChatMessage.create({ sender, threadId, msgTxt });
        pubsub.publish('THREAD_CHANGE', { message, type: 'CREATE' });

        message.status = "Message successfully created!";

        return message;
    }
    catch (err) { return { status: err.message }; };
};

const updateMessage = async ({ msgId, msgTxt }, { pubsub }) =>
{
    try
    {
        let message = await ChatMessage.findByIdAndUpdate(msgId, { msgTxt });
        pubsub.publish('THREAD_CHANGE', { message, type: 'UPDATE' });

        message.status = "Message successfully updated!";

        return message;
    }
    catch (err) { return { status: err.message }; };
};

const deleteMessage = async ({ msgId }, { pubsub }) =>
{
    try
    {
        await ChatMessage.findByIdAndDelete(msgId);
        pubsub.publish('THREAD_CHANGE', { message: { msgId }, type: 'DELETE' });
        
        return { msgId, status: "Message successfully deleted!" };
    }
    catch (err) { return { status: err.message }; };
};

module.exports = { getChatMessages, createMessage, updateMessage, deleteMessage };