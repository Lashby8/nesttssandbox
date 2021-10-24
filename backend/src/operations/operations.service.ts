import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation, OperationsStatus } from './operations.model';
import { CreateOperationDto } from './dto/create-operation.dto';
import { OperationsEventsGW } from './operations.event';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private operationsRepository: Repository<Operation>,
    private readonly operationsEventsGW: OperationsEventsGW,
  ) {}

  async findAll(): Promise<Operation[]> {
    return this.operationsRepository.find();
  }

  async findOne(id: string): Promise<Operation> {
    return this.operationsRepository.findOneOrFail({ id: id });
  }

  async create(createOperationDto: CreateOperationDto): Promise<Operation> {
    const operation = new Operation();
    operation.name = createOperationDto.name;
    operation.status = OperationsStatus.PENDING;
    const newOperation = await this.saveToDBAndBroadcastToClients(operation);

    setTimeout(() => this.resolveOperation(newOperation), 5000);

    return newOperation;
  }

  async remove(id: string): Promise<Operation> {
    const obj = await this.operationsRepository.findOne(id);
    await this.operationsRepository.delete(id);

    return obj;
  }

  async resolveOperation(pendingOperation: Operation): Promise<void> {
    await this.saveToDBAndBroadcastToClients({
      id: pendingOperation.id,
      name: pendingOperation.name,
      status:
        Math.random() < 0.5 ? OperationsStatus.DONE : OperationsStatus.FAILED,
    });
  }

  async saveToDBAndBroadcastToClients(
    operation: Operation,
  ): Promise<Operation> {
    const res = await this.operationsRepository.save(operation);
    this.operationsEventsGW.sendUpdatedOperationForAllClients(res);

    return res;
  }
}
