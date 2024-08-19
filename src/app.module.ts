import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { UserModule } from './user/user.module';
import { FamilyModule } from './family/family.module';
import { MessageModule } from './message/message.module';
import { PostModule } from './post/post.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '3d'}
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    FamilyModule,
    MessageModule,
    PostModule,
    SocketModule,
  ],
  providers: [JwtStrategy, JwtService]
})
export class AppModule {}