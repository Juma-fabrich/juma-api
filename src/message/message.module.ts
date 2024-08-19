import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaService } from 'src/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  providers: [MessageService, PrismaService, SocketGateway],
  controllers: [MessageController]
})
export class MessageModule {}
