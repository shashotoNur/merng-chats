const { GraphQLObjectType, GraphQLString, GraphQLID,
    GraphQLList, GraphQLNonNull } = require('graphql');

const { ChatMessageType } = require('./chatMessageSchema');

const { getChatMessages } = require('../resolvers/chatResolvers');
const { getChatThread } = require('../resolvers/threadResolvers');

// Return types
const ChatThreadType = new GraphQLObjectType(
    {
        name: 'ChatThread',
        fields: () => ({
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            chatMessageIds: { type: new GraphQLList(GraphQLID) },
            userIds: { type: new GraphQLList(GraphQLID) },
            chatMessages: {
                type: new GraphQLList(ChatMessageType),
                resolve(parent, _args) { return getChatMessages(parent); }
            },
            status: { type: new GraphQLList(GraphQLString) }
        })
    });

// Queries and mutations
const getChatThread = {
    type: ChatThreadType,
    args: { threadId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(_parent, args, context) { return getChatThread(args, context); }
};

module.exports = { getChatThread, createChatMessage, updateChatMessage, deleteChatMessage };