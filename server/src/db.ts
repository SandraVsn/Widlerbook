import { DataSource } from 'typeorm';
import Wilder from './models/Wilder';
import Skill from './models/Skill';
import Grade from './models/Grade';

export default new DataSource ({
  type: 'sqlite',
  database: './wildersdb.sqlite',
  synchronize: true,
  entities: [Wilder, Skill, Grade],
  logging: ['query', 'error'],
});

