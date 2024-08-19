import { SendDTO } from 'src/DTO/message';
import { Payload } from 'src/jwt-strategy';
import { PrismaService } from 'src/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';
export declare class MessageService {
    private readonly db;
    private readonly socket;
    constructor(db: PrismaService, socket: SocketGateway);
    send(user: Payload, familyId: string, { photo, text }: SendDTO): Promise<void>;
    get(user: Payload, familyId: string): Promise<({
        user: {
            id: string;
            name: string;
            password: string;
            photo: string;
        };
        family: {
            id: string;
        };
    } & {
        id: string;
        text: string;
        photo: string;
        userId: string;
        familyId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
