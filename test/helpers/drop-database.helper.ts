import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  // create the connection
  const AppDataSource = new DataSource({
    // reads from .env.test
    type: 'postgres',
    synchronize: config.get('database.synchronize'),
    port: config.get('database.port'),
    username: config.get('database.user'),
    password: config.get('database.password'),
    host: config.get('database.host'),
    database: config.get('database.name'),
  });
  await AppDataSource.initialize()
  // drop all tables
  await AppDataSource.dropDatabase()
  // close the connection
  await AppDataSource.destroy()
}
