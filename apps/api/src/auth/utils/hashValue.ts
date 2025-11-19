import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashValue = async (value: string): Promise<string> =>
  bcrypt.hash(value, SALT_ROUNDS);
