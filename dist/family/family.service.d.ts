import { CreateDTO, RequestDTO } from 'src/DTO/family';
import { Payload } from 'src/jwt-strategy';
import { PrismaService } from 'src/prisma.service';
export declare class FamilyService {
    private readonly db;
    constructor(db: PrismaService);
    create(user: Payload, data: CreateDTO): Promise<{
        id: string;
        name: string;
        photo: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateHead(user: Payload, newHeadId: string, familyId: string): Promise<{
        id: string;
        userId: string;
        familyId: string;
    }>;
    request(user: Payload, familyId: string, { about }: RequestDTO): Promise<{
        id: string;
        about: string;
        userId: string;
        familyId: string;
        type: import(".prisma/client").$Enums.Request;
    }>;
    getRequest(user: Payload, familyId: string): Promise<({
        user: {
            id: string;
            name: string;
            password: string;
            photo: string;
        };
    } & {
        id: string;
        about: string;
        userId: string;
        familyId: string;
        type: import(".prisma/client").$Enums.Request;
    })[]>;
    getInvitation(user: Payload): Promise<({
        family: {
            id: string;
            name: string;
            photo: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        about: string;
        userId: string;
        familyId: string;
        type: import(".prisma/client").$Enums.Request;
    })[]>;
    invite(user: Payload, userId: string, familyId: string, { about }: RequestDTO): Promise<{
        id: string;
        about: string;
        userId: string;
        familyId: string;
        type: import(".prisma/client").$Enums.Request;
    }>;
    accept(user: Payload, familyId: string, id: string): Promise<{
        id: string;
        name: string;
        photo: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    decline(user: Payload, familyId: string, id: string): Promise<void>;
    get(user: Payload, familyId: string): Promise<{
        members: {
            id: string;
            name: string;
            password: string;
            photo: string;
        }[];
        familyRequest: ({
            user: {
                id: string;
                name: string;
                password: string;
                photo: string;
            };
        } & {
            id: string;
            about: string;
            userId: string;
            familyId: string;
            type: import(".prisma/client").$Enums.Request;
        })[];
    } & {
        id: string;
        name: string;
        photo: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAll(): Promise<({
        members: {
            id: string;
            name: string;
            password: string;
            photo: string;
        }[];
        familyRequest: ({
            user: {
                id: string;
                name: string;
                password: string;
                photo: string;
            };
        } & {
            id: string;
            about: string;
            userId: string;
            familyId: string;
            type: import(".prisma/client").$Enums.Request;
        })[];
    } & {
        id: string;
        name: string;
        photo: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    private isMembers;
}
