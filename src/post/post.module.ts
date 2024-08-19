import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  providers: [PostService, PrismaService, SocketGateway],
  controllers: [PostController]
})
export class PostModule {}
