const ChatThread = require('../models/chatThreadModel');

const getChatThread = async ({ user , otherUser }) =>
{
    let thread;
    try
    {
        thread = ChatThread.find({ users: { "$in": [user, otherUser] } });
        if(!thread) thread = await createThread({ user, otherUser });

        return thread;
    }
    catch (err) { return { status: err }; };
};

const createThread = async ({ user, otherUser }) =>
{
    try
    {
        let thread = await ChatThread.create({ user, otherUser });
        thread.status = "Message successfully created!";
        return thread;
    }
    catch (err) { return { status: err }; };
};

module.exports = { getChatThread };