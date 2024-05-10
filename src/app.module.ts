import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { SocketModule } from './socket/socket.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [FastifyMulterModule, SocketModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
