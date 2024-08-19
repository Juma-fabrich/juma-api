import { CreateDTO, ReactDTO } from 'src/DTO/post';
import { Payload } from 'src/jwt-strategy';
import { PrismaService } from 'src/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';
export declare class PostService {
    private readonly db;
    private readonly socket;
    constructor(db: PrismaService, socket: SocketGateway);
    create(user: Payload, data: CreateDTO): Promise<{
        user: {
            id: string;
            name: string;
            password: string;
            photo: string;
        };
        reaction: ({
            user: {
                id: string;
                name: string;
                password: string;
                photo: string;
            };
        } & {
            id: string;
            type: import(".prisma/client").$Enums.ReactionType;
            userId: string;
            postId: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: string;
        text: string;
        photo: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAll(): Promise<({
        user: {
            id: string;
            name: string;
            password: string;
            photo: string;
        };
        reaction: ({
            user: {
                id: string;
                name: string;
                password: string;
                photo: string;
            };
        } & {
            id: string;
            type: import(".prisma/client").$Enums.ReactionType;
            userId: string;
            postId: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: string;
        text: string;
        photo: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getOne(id: string): Promise<{
        user: {
            id: string;
            name: string;
            password: string;
            photo: string;
        };
        reaction: ({
            user: {
                id: string;
                name: string;
                password: string;
                photo: string;
            };
        } & {
            id: string;
            type: import(".prisma/client").$Enums.ReactionType;
            userId: string;
            postId: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: string;
        text: string;
        photo: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    react(user: Payload, { postId, type }: ReactDTO): Promise<{
        user: {
            id: string;
            name: string;
            password: string;
            photo: string;
        };
        reaction: ({
            user: {
                id: string;
                name: string;
                password: string;
                photo: string;
            };
        } & {
            id: string;
            type: import(".prisma/client").$Enums.ReactionType;
            userId: string;
            postId: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: string;
        text: string;
        photo: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
