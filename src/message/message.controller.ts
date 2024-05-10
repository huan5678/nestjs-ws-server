import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { SocketGateway } from '../socket/socket.gateway';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Post()
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const message = (await this.messageService.createMessage(
      createMessageDto,
    )) as Message;
    this.socketGateway.broadcastMessage(message);
    return message;
  }

  @Get(':roomId')
  async getMessages(@Param('roomId') roomId: string): Promise<Message[]> {
    return this.messageService.getMessages(roomId);
  }
}
