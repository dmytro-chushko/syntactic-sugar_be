import { UploadImageDto } from 'src/modules/files/dtos/uploadImage.dto';
import { IFileUpload } from 'src/modules/files/interfaces/IFileUpload';

export interface IFilesService {
  createFile(file: UploadImageDto): Promise<IFileUpload>;
}
