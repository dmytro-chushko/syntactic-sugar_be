import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();

  return bcrypt.hash(password, salt);
}

export async function comparePassword(hashPassword: string, password: string): Promise<boolean> {
  try {
    const passwordEquals = await bcrypt.compare(hashPassword, password);

    return passwordEquals;
  } catch (error) {
    throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
