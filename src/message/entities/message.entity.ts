import { ApiProperty } from '@nestjs/swagger';

export class Message {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  senderId: string;

  @ApiProperty()
  roomId: string;

  @ApiProperty()
  createdAt: Date;
}
