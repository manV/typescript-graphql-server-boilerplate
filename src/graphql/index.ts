import resolvers from './resolvers';
import typeDefs from './schema';
import permissions from './permissions';

import { makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';

const schemaWithoutMiddleware = makeExecutableSchema({
  typeDefs,
  resolvers
});

const schema = applyMiddleware(schemaWithoutMiddleware, permissions);

export { schema };
