const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { createChatMessage, updateChatMessage, deleteChatMessage } = require('./chatMessageSchema');
const { getChatThread, threadChangeSubscription } = require('./chatThreadSchema');

// Reading data from database
const RootQuery = new GraphQLObjectType(
    {
        name: 'RootQueryType',
        fields: { getChatThread }
    });

// Anything that changes database
const RootMutation = new GraphQLObjectType(
    {
        name: 'Mutation',
        fields:
            {
                createChatMessage,
                updateChatMessage,
                deleteChatMessage
            }
    });

// Listening to changes in real time
const RootSubscription = new GraphQLObjectType(
    {
        name: 'Subscription',
        fields: { threadChangeSubscription }
    });


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    subscription: RootSubscription
});