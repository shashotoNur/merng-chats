require('dotenv').config({ path: './config/config.env' });

const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const { app } = require('./config/app');
const connectToDatabase = require('./config/db');
const schema = require('./schema/');

const initializeServer = async () =>
    {
        await connectToDatabase();
        
        const PORT = process.env.PORT || 5000;
        const server = createServer(app);
        server.listen(PORT,
            // add subscription to graphql server
            () =>
                {
                    console.log(`\tHTTP server running at localhost:5000${ process.env.GRAPHQL_ROUTE }`);

                    new SubscriptionServer(
                        { execute, subscribe, schema },
                        { server, path: process.env.GRAPHQL_SUBSCRIPTION_ROUTE, }
                    );

                    console.log(`\tSubscription server running at localhost:5000`,
                    `${process.env.GRAPHQL_SUBSCRIPTION_ROUTE}`)

                }
        );
    };

initializeServer();