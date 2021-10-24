import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationsController } from './operations.controller';
import { Operation } from './operations.model';
import { OperationsService } from './operations.service';
import { OperationsEventsGW } from './operations.event';

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  providers: [OperationsService, OperationsEventsGW],
  controllers: [OperationsController],
})
export class OperationsModule {}
