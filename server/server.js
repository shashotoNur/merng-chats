require('dotenv').config({ path: './config/config.env' });

import { createServer } from 'http';
import { execute, subscribe } from 'graphql';

const app = require('./config/app');
const connectToDatabase = require('./config/db');

const initializeServer = async () =>
    {
        await connectToDatabase();
        
        const PORT = process.env.PORT || 5000;
        const server = createServer(app);
        server.listen(PORT,
            () =>
                {
                    new SubscriptionServer(
                        { execute, subscribe, schema: myGraphQLSchema, },
                        { server: server, path: '/subscriptions', }
                    );

                    console.log(`Server running at localhost:${PORT}${process.env.GRAPHQL_ROUTE}`)
                }
        );
    };

initializeServer();