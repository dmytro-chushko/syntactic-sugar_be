import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { FilesService } from './services/files.service';

@Module({
  providers: [
    {
      provide: Services.FILES,
      useClass: FilesService,
    },
  ],
})
export class FilesModule {}
