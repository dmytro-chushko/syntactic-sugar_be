import { SetMetadata } from '@nestjs/common';

export const Activated = (activated: boolean) =>
  SetMetadata('activated', activated);
