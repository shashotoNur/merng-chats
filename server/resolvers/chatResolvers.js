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

const createMessage = async ({ threadId, sender, msgTxt}) =>
{
    try
    {
        let message = await ChatMessage.create({ sender, threadId, msgTxt });
        message.status = "Message successfully created!";

        return message;
    }
    catch (err) { return { status: err.message }; };
};

const updateMessage = async ({ msgId, msgTxt }) =>
{
    try
    {
        let message = await ChatMessage.findByIdAndUpdate(msgId, { msgTxt });
        message.status = "Message successfully updated!";

        return message;
    }
    catch (err) { return { status: err.message }; };
};

const deleteMessage = async ({ msgId }) =>
{
    try
    {
        await ChatMessage.findByIdAndDelete(msgId);
        
        return { msgId, status: "Message successfully deleted!" };
    }
    catch (err) { return { status: err.message }; };
};

module.exports = { getChatMessages, createMessage, updateMessage, deleteMessage };