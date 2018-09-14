import * as dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import * as morgan from 'morgan';

import { schema } from './graphql';

const server = new ApolloServer({
  schema,
  playground: true,
  context: ({ req }: { req: Express.Request }) => ({
    req
  })
});

const app = express();
app.use(morgan('dev'));
server.applyMiddleware({ app });

createConnection()
  .then(() => {
    app.listen(
      {
        port: parseInt(process.env.SERVER_PORT as string, 10)
      },
      () => {
        console.log(
          `server started on http://localhost:${process.env.SERVER_PORT}`
        );
      }
    );
  })
  .catch((error) => console.log(error));
