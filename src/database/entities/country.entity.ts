import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CountryName } from 'src/database/enums';

// Will be added after merging Freelancer and Employer entity

// import { Job } from './jobs.entity';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    unique: true,
  })
  name: CountryName;

  // Will be added after merging Freelancer and Employer entity

  // @ManyToMany(() => Job, job => job.countries)
  // jobs: Job[];
}
