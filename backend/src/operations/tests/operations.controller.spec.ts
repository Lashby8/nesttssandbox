import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OperationsController } from '../operations.controller';
import { OperationsService } from '../operations.service';
import { Operation, OperationsStatus } from '../operations.model';
import { OperationsEventsGW } from '../operations.event';
import { CreateOperationDto } from '../dto/create-operation.dto';

const createMock = jest.fn((dto: any) => {
  return dto;
});

const saveMock = jest.fn((dto: any) => {
  return dto;
});

const MockRepository = jest.fn().mockImplementation(() => {
  return {
    create: createMock,
    save: saveMock,
  };
});
const mockRepository = new MockRepository();

describe('OperationController', () => {
  let operationsController: OperationsController;
  let operationsService: OperationsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        OperationsService,
        OperationsEventsGW,
        {
          provide: getRepositoryToken(Operation),
          useValue: mockRepository,
        },
      ],
      controllers: [OperationsController],
    }).compile();

    operationsService = moduleRef.get<OperationsService>(OperationsService);
    operationsController =
      moduleRef.get<OperationsController>(OperationsController);
  });

  describe('findAll', () => {
    it('should return an array of operations', async () => {
      const result: Operation[] = [
        {
          id: '1',
          name: 'aba',
          status: OperationsStatus.DONE,
        },
        {
          id: '2',
          name: 'caba',
          status: OperationsStatus.PENDING,
        },
      ];
      jest
        .spyOn(operationsService, 'findAll')
        .mockImplementation(async () => result);
      expect(await operationsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return enity by id', async () => {
      const result: Operation[] = [
        {
          id: '1',
          name: 'aba',
          status: OperationsStatus.DONE,
        },
        {
          id: '2',
          name: 'caba',
          status: OperationsStatus.PENDING,
        },
      ];
      jest
        .spyOn(operationsService, 'findOne')
        .mockImplementation(async (necessaryID: string) => {
          for (let i = 0; i < result.length; i++) {
            if (result[i].id === necessaryID) {
              return result[i];
            }
          }
        });
      expect(await operationsController.findOne('1')).toBe(result[0]);
    });
  });

  describe('create', () => {
    it('should create new enity', async () => {
      const newOperaton = {
        id: Math.random().toString(),
        status: OperationsStatus.PENDING,
      };
      const createOpDto = { name: 'new Name' };
      jest
        .spyOn(operationsService, 'create')
        .mockImplementation(async (createOperationDto: CreateOperationDto) => {
          return {
            ...newOperaton,
            name: createOperationDto.name,
          };
        });

      expect(await operationsController.create(createOpDto)).toStrictEqual({
        ...newOperaton,
        ...createOpDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove new enity', async () => {
      const result: Operation[] = [
        {
          id: '1',
          name: 'aba',
          status: OperationsStatus.DONE,
        },
        {
          id: '2',
          name: 'caba',
          status: OperationsStatus.PENDING,
        },
      ];

      jest
        .spyOn(operationsService, 'remove')
        .mockImplementation(async (necessaryID: string) => {
          for (let i = 0; i < result.length; i++) {
            if (result[i].id === necessaryID) {
              const neccessaryElem = result[i];
              result.splice(i, 1);
              return neccessaryElem;
            }
          }
        });

      expect(await operationsController.delete('2')).toStrictEqual({
        id: '2',
        name: 'caba',
        status: OperationsStatus.PENDING,
      });
      expect(result.length === 1).toBe(true);
    });
  });
});
