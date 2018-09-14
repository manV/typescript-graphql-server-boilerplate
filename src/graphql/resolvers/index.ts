import { merge } from 'lodash';
import { IResolverMap } from './../../types/graphql-utils';
import * as graphqlIsoDate from 'graphql-iso-date';
import User from './user';

const resolvers: IResolverMap = merge(
  {
    Date: graphqlIsoDate.GraphQLDate,
    DateTime: graphqlIsoDate.GraphQLDateTime
  },
  User
);

export default resolvers;
