import { registerAs } from '@nestjs/config';
// namespace will be accessed in the factory in the config
export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  name: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.DB_AUTOLOADENTITIES === 'true' ? true : false,
}));
