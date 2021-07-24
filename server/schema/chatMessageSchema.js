const { GraphQLObjectType, GraphQLString, GraphQLID,
    GraphQLScalarType, GraphQLList } = require('graphql');

const { createMessage, updateMessage, deleteMessage } = require('../resolvers/chatResolvers');

// Custom type definition
const CustomDate = new GraphQLScalarType({
    name: 'Date',
    parseValue(value) { return new Date(value); },
    serialize(value) { return value.toISOString(); }
});

// Return types
const ChatMessageType = new GraphQLObjectType(
    {
        name: 'ChatMessage',
        fields: () => ({
            id: { type: GraphQLID },
            sender: { type: GraphQLID },
            msgTxt: { type: GraphQLString },
            time: { type: CustomDate },
            status: { type: new GraphQLList(GraphQLString) }
        })
    });

// Queries and subscriptions
const createChatMessage = {
    type: ChatMessageType,
    args:
    {
        threadId: { type: GraphQLID },
        sender: { type: GraphQLString },
        msgTxt: { type: GraphQLString }
    },
    resolve(_parent, args) { return createMessage(args); }
};

const updateChatMessage = {
    type: ChatMessageType,
    args:
    {
        msgId: { type: GraphQLID },
        msgTxt: { type: GraphQLString }
    },
    resolve(_parent, args) { return updateMessage(args); }
};

const deleteChatMessage = {
    type: ChatMessageType,
    args:
    {
        msgId: { type: GraphQLID }
    },
    resolve(_parent, args) { return deleteMessage(args); }
};


module.exports = { createChatMessage, updateChatMessage, deleteChatMessage };