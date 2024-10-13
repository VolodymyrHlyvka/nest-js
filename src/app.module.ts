import { Module } from '@nestjs/common';
import { TasksModule } from './modules/task/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeormConfig } from 'config/typeorm.config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ProfileModule } from './modules/profile/profile.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: parseInt(configService.get<string>('REDIS_PORT')!),
          },
        });
        return {
          store: () => store,
        };
      },
      inject: [ConfigService],
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      useFactory: typeormConfig,
    }),
    AuthModule,
    ProfileModule,
    CategoryModule,
  ],
})
export class AppModule {}
