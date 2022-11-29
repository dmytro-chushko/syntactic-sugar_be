import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CountryName } from 'src/database/enums';
import { Job } from './jobs.entity';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    unique: true,
  })
  name: CountryName;

  @ManyToMany(() => Job, job => job.countries)
  jobs: Job[];
}
