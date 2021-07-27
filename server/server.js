require('dotenv').config({ path: './config/config.env' });

import { createServer } from 'http';
import { execute, subscribe } from 'graphql';

const app = require('./config/app');
const connectToDatabase = require('./config/db');
const schema = require('../schema/');

const initializeServer = async () =>
    {
        await connectToDatabase();
        
        const PORT = process.env.PORT || 5000;
        const server = createServer(app);
        server.listen(PORT,
            () =>
                {
                    new SubscriptionServer(
                        { execute, subscribe, schema },
                        { server, path: process.env.GRAPHQL_SUBSCRIPTION_ROUTE, }
                    );

                    console.log(`Server listening on ${ PORT } at ${ process.env.GRAPHQL_ROUTE } & ${ process.env.GRAPHQL_ROUTE }`)
                }
        );
    };

initializeServer();