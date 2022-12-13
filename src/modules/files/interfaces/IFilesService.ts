export interface IFilesService {
  createFile(file): Promise<string>;
}
