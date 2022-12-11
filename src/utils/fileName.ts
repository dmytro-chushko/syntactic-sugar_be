import { Request } from 'express';
import { extname } from 'path';

export const fileName = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = extname(file.originalname);
  const filename = `${uniqueSuffix}${ext}`;

  callback(null, filename);
};
