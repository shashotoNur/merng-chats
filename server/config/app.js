const express = require('express');
const { graphqlHTTP } = require('express-graphql');
import { PubSub } from 'graphql-subscriptions';
const cors = require('cors');

const schema = require('../schema/');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = { origin: 'http://localhost:3000', credentials: true };
app.use(cors(corsOptions));

const pubsub = new PubSub();

app.use(process.env.GRAPHQL_ROUTE, graphqlHTTP((_req, _res) =>
    ({
      schema,
      context: { pubsub },
      graphiql: true
    })
  )
);


console.log('Express app initialised!');

module.exports = app;