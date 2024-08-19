import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT
  }
})
export class SocketGateway {

  @WebSocketServer()
  readonly server: Server

  handleConnection(client: Socket){}

  handleDisconnect(client: Socket){}
}
