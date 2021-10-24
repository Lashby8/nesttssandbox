import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
  Header,
} from '@nestjs/common';
import { Operation } from './operations.model';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';

@Controller('api/operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get(':id')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  findOne(@Param('id') id: string): Promise<Operation> {
    return this.operationsService.findOne(id);
  }

  @Get()
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  findAll(): Promise<Operation[]> {
    return this.operationsService.findAll();
  }

  @Post()
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  create(@Query() createUserDto: CreateOperationDto): Promise<Operation> {
    return this.operationsService.create(createUserDto);
  }

  @Delete()
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  delete(@Query('id') id: string): Promise<Operation> {
    return this.operationsService.remove(id);
  }
}
