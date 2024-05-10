import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MessageService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createMessage(data: any) {
    return await this.prisma.message.create({ data });
  }

  async getMessages(roomId: string) {
    return await this.prisma.message.findMany({
      where: { roomId },
    });
  }
}
