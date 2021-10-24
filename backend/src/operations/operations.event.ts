import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Operation } from './operations.model';

@WebSocketGateway({ port: 80 })
export class OperationsEventsGW
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Set<Socket>;

  constructor() {
    this.clients = new Set<Socket>();
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('OperationsEventsGW');

  sendUpdatedOperationForAllClients(updatedOperation: Operation) {
    this.logger.log(`Clients for broadcast: ${this.clients.size}`);

    for (const client of this.clients) {
      client.emit('updatedOperation', JSON.stringify(updatedOperation));
      this.logger.log(`Update for ${client.id} client was sent`);
    }
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.clients.add(client);
    this.logger.log(`Client connected: ${client.id}`);
  }
}
