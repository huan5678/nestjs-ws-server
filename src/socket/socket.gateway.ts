import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
} from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { Message } from '../message/entities/message.entity';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  broadcastMessage(message: Message) {
    this.server.emit('newMessage', message);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    const parsedPayload = JSON.parse(payload);
    this.server.to(parsedPayload.roomId).emit('message', parsedPayload);
    console.log(
      `client ${client.id} sent payload ${JSON.stringify(parsedPayload)}`,
    );
    console.log(
      `Message ${parsedPayload.content} sent to room ${parsedPayload.roomId}`,
    );
    return 'Message sent to room';
  }
}
