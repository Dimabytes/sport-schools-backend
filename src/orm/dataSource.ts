import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { configData } from './typeormConfig';

export function getNewAppDataSource(): DataSource {
  return new DataSource(configData);
}

let AppDataSource: DataSource;

export async function getAppDataSource(): Promise<DataSource> {
  if (AppDataSource && AppDataSource.isInitialized) {
    console.log('[getAppDataSource] ORM is already initialized');
    return AppDataSource;
  }
  try {
    AppDataSource = getNewAppDataSource();
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    console.log('[getAppDataSource] ORM has been initialized');
    return AppDataSource;
  } catch (error) {
    console.log(
      `[getAppDataSource] Error fetching AppDataSource: ${error.message}`,
    );
    throw new Error(error);
  }
}

export async function initializeDataSources(): Promise<void> {
  await getAppDataSource();
}
