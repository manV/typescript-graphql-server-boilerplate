import { User } from '../entity/User';
// import { getLoaders } from './../graphql/dataloaders';

export interface IContext {
  user: User;
  req: Express.Request;
  // loaders: ReturnType<typeof getLoaders>;
}

export type Resolver = (
  parent: any,
  args: any,
  context: IContext,
  info: any
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: IContext,
  info: any
) => any;

export interface IResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
