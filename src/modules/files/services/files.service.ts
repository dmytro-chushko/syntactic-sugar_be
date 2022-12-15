import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { IFileUpload } from 'src/modules/files/interfaces/IFileUpload';

@Injectable()
export class FilesService {
  async createFile(file): Promise<IFileUpload> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return { file: fileName };
    } catch (error) {
      throw new HttpException('Error while file recorded', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
