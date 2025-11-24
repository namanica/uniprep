import * as bcrypt from 'bcrypt';

export const compareValue = async (value: string, hash: string) =>
  bcrypt.compare(value, hash);
