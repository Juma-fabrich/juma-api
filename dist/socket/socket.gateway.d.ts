import { Server, Socket } from 'socket.io';
export declare class SocketGateway {
    readonly server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
