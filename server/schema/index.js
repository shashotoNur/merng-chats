const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { createChatMessageMutation, updateChatMessageMutation,
                deleteChatMessageMutation } = require('./chatMessageSchema');
const { getChatThreadQuery, threadChangeSubscription } = require('./chatThreadSchema');

// Reading data from database
const RootQuery = new GraphQLObjectType(
    {
        name: 'RootQueryType',
        fields: { getChatThreadQuery }
    });

// Anything that changes database
const RootMutation = new GraphQLObjectType(
    {
        name: 'Mutation',
        fields:
            {
                createChatMessageMutation,
                updateChatMessageMutation,
                deleteChatMessageMutation
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