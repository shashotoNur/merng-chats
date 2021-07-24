const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { getChatThread, createChatMessage, updateChatMessage, deleteChatMessage } = require('./chatSchema');

// Reading data
const RootQuery = new GraphQLObjectType(
    {
        name: 'RootQueryType',
        fields:
        {
            getChatThread
        }
    });

// Anything other than reading
const RootSubscription = new GraphQLObjectType(
    {
        name: 'Mutation',
        fields:
        {
            createChatMessage,
            updateChatMessage,
            deleteChatMessage
        }
    });


module.exports = new GraphQLSchema({
    query: RootQuery,
    subscription: RootSubscription
});