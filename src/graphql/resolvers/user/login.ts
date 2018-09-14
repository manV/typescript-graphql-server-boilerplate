import { User } from '../../../entity/User';
import { UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcryptjs';
import { generateToken } from './../../../utils/auth';
import { Session } from '../../../entity/Session';

export default async (_: any, args: GQL.ILoginOnMutationArguments) => {
  const { email, password } = args.input;
  // TODO validate email

  let user;
  try {
    user = await User.findOne({
      where: {
        email
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error('An internal server error occured');
  }

  if (!user) {
    console.error('incorrect email');
    throw new UserInputError('Incorrect Email or Password', {
      invalidArgs: ['email', 'password']
    });
  }

  let success = false;

  try {
    success = await bcrypt.compare(password, user.password);
  } catch (e) {
    console.error(e);
    throw new Error('An internal server error occured');
  }

  if (!success) {
    console.error('incorrect password');
    throw new UserInputError('Incorrect Email or Password', {
      invalidArgs: ['email', 'password']
    });
  }

  let token;
  try {
    token = await generateToken();
  } catch (error) {
    console.error(error);
    throw new Error('An internal server error occured');
  }

  try {
    const session = new Session();
    session.userId = user.id;
    session.token = token;
    session.expiresAt =
      new Date().getTime() +
      parseInt(process.env.SESSION_TIMEOUT as string, 10);
    await session.save();
  } catch (error) {
    console.error(error);
    throw new Error('An internal server error occured');
  }

  return {
    token,
    user
  };
};
