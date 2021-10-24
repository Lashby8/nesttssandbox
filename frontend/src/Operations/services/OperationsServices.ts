import { Operation } from "../interfaces/Operations";
import { api, API_METHODS } from "./helpers";
import { CreateOperationDto } from "../dto/CreateOperationDto";

export class OperationsService {
  private backendUrl: string;
  private port: string;

  constructor(backendUrl: string, port: number) {
    this.backendUrl = backendUrl;
    this.port = port.toString();
  }

  public async fetchAllOperations(): Promise<Operation[]> {
    const operations = await api<Operation[]>(
      this.backendUrl,
      this.port,
      "api/operations"
    );

    return operations;
  }

  public async createOperation(name: string): Promise<Operation> {
    const createOperationDto = { name } as CreateOperationDto;

    const operation = await api<Operation>(
      this.backendUrl,
      this.port,
      "api/operations",
      API_METHODS.POST,
      { ...createOperationDto }
    );

    return operation;
  }
}
