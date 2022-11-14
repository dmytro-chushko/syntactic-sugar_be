import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt();

  return bcrypt.hash(password, salt);
}

export async function comparePassword(hashPassword: string, password: string) {
  const passwordEquals = await bcrypt.compare(hashPassword, password);

  return passwordEquals;
}
