import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import entities from './entities';
import migrations from './migrations';

config();

export const configData: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DB_DATABASE_NAME || 'db',
  logging: ['error', 'migration', 'warn', 'schema'],
  synchronize: false,
  migrations: migrations,
  entities: entities,
};

export default new DataSource(configData);
