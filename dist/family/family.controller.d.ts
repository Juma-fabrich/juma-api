import { FamilyService } from './family.service';
import { CreateDTO, RequestDTO } from 'src/DTO/family';
import { Payload } from 'src/jwt-strategy';
export declare class FamilyController {
    private readonly service;
    constructor(service: FamilyService);
    get({ user }: {
        user: Payload;
    }, familyId: string): Promise<{
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
    create({ user }: {
        user: Payload;
    }, data: CreateDTO): Promise<{
        id: string;
        name: string;
        photo: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateHead({ user }: {
        user: Payload;
    }, familyId: string, newHeadId: string): Promise<{
        id: string;
        userId: string;
        familyId: string;
    }>;
    request({ user }: {
        user: Payload;
    }, familyId: string, { about }: RequestDTO): Promise<{
        id: string;
        about: string;
        userId: string;
        familyId: string;
        type: import(".prisma/client").$Enums.Request;
    }>;
    invite({ user }: {
        user: Payload;
    }, familyId: string, userId: string, { about }: RequestDTO): Promise<{
        id: string;
        about: string;
        userId: string;
        familyId: string;
        type: import(".prisma/client").$Enums.Request;
    }>;
    getInvitation({ user }: {
        user: Payload;
    }): Promise<({
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
    getRequest({ user }: {
        user: Payload;
    }, familyId: string): Promise<({
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
    accept({ user }: {
        user: Payload;
    }, familyId: string, id: string): Promise<{
        id: string;
        name: string;
        photo: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    decline({ user }: {
        user: Payload;
    }, familyId: string, id: string): Promise<void>;
}
