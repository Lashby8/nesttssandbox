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
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: 3306,
      entities: [Operation],
      synchronize: true,
      retryAttempts: 5,
    }),
    OperationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
