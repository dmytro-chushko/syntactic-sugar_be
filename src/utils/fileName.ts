import { Request } from 'express';
import { extname } from 'path';

export const fileName = (
  _req: Request,
  file: { originalName: string },
  callback: (arg1: null, arg2: string) => void,
) => {
  const uniqueSuffix: string = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext: string = extname(file.originalName);
  const filename = `${uniqueSuffix}${ext}`;

  callback(null, filename);
};
