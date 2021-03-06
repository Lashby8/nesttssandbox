import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Operation } from './operations/operations.model';
import { OperationsModule } from './operations/operations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: 3306,
      entities: [Operation],
      synchronize: true,
      retryAttempts: 5,
      charset: 'utf8mb4',
    }),
    OperationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
