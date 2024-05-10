import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [SocketModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
