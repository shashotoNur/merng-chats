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
            chatMessages: {
                type: new GraphQLList(ChatMessageType),
                resolve(parent, _args) { return getChatMessages(parent); }
            },
            status: { type: GraphQLString }
        })
    });

const ThreadChangeType = new GraphQLObjectType(
    {
        name: 'ThreadChange',
        fields: () => ({
            chatMessage: { type: ChatMessageType },
            type: { type: GraphQLString }
        })
    });

// Queries and subscription
const getChatThread = {
    type: ChatThreadType,
    args: { threadId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(_parent, args, context) { return getChatThread(args, context); }
};

const threadChangeSubscription = {
    type: ThreadChangeType,
    args: { threadId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: (payload) => { return payload; },
    subscribe: () => pubsub.asyncIterator('THREAD_CHANGE')
};

module.exports = { getChatThread, threadChangeSubscription };