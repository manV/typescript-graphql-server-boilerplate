import { rule } from 'graphql-shield';
import { AuthenticationError } from 'apollo-server-core';
import { Request } from 'express';
import { Session } from '../../../entity/Session';

export const isAuthenticated = rule()(async (_: any, __: any, ctx: any) => {
  const {
    req
  }: {
    req: Request;
  } = ctx;

  if (!req.get('authorization')) {
    return new AuthenticationError('No Authorization header found.');
  }

  let user;
  try {
    user = await Session.checkTokenValidity(req.get('authorization') as string);
  } catch (e) {
    console.error(e);
    return new Error('Internal server error.');
  }
  if (user) {
    ctx.user = user;
    return true;
  } else {
    return new AuthenticationError('Invalid security token.');
  }
});
