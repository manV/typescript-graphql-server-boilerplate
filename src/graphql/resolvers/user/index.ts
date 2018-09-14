import { IResolverMap } from './../../../types/graphql-utils';
import login from './login';

const resolvers: IResolverMap = {
  Mutation: {
    login
  }
};

export default resolvers;
