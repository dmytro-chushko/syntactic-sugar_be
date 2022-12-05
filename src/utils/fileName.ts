import { extname } from 'path';

export const fileName = (_req, file, callback) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = extname(file.originalname);
  const filename = `${uniqueSuffix}${ext}`;
  callback(null, filename);
};
