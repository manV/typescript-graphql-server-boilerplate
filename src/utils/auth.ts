import * as crypto from 'crypto';
import * as util from 'util';

const randomBytes = util.promisify(crypto.randomBytes);

export const generateToken = async () => {
  let buffer;
  try {
    buffer = await randomBytes(128);
    return buffer.toString('hex');
  } catch (e) {
    throw new Error(e);
  }
};
