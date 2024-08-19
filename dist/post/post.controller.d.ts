import { PostService } from './post.service';
import { Payload } from 'src/jwt-strategy';
import { CreateDTO, ReactDTO } from 'src/DTO/post';
export declare class PostController {
    private readonly service;
    constructor(service: PostService);
    create({ user }: {
        user: Payload;
    }, data: CreateDTO): Promise<{
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
    react({ user }: {
        user: Payload;
    }, data: ReactDTO): Promise<{
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
