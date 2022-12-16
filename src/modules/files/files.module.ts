import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { FilesService } from './services/files.service';
import { FilesController } from './controllers/files.controller';

@Module({
  providers: [
    {
      provide: Services.FILES,
      useClass: FilesService,
    },
  ],
  exports: [
    {
      provide: Services.FILES,
      useClass: FilesService,
    },
  ],
  controllers: [FilesController],
})
export class FilesModule {}
