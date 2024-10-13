import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: <string>process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  logging: true,
  synchronize: true,
  migrationsRun: false,
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export const typeormConfig = registerAs(
  'typeorm.config',
  (): TypeOrmModuleOptions => config,
);
