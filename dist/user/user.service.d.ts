import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from 'src/DTO/user';
import { Payload } from 'src/jwt-strategy';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly db;
    private readonly jwt;
    constructor(db: PrismaService, jwt: JwtService);
    signUp(data: AuthDTO): Promise<{
        id: string;
        name: string;
        password: string;
        photo: string;
    }>;
    login(data: AuthDTO): Promise<{
        token: string;
    }>;
    search(query: string): Promise<{
        id: string;
        name: string;
        password: string;
        photo: string;
    }[]>;
    auth(user: Payload): Promise<{
        family: ({
            message: ({
                user: {
                    id: string;
                    name: string;
                    password: string;
                    photo: string;
                };
                family: {
                    id: string;
                    name: string;
                    photo: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                text: string;
                photo: string;
                userId: string;
                familyId: string;
                createdAt: Date;
                updatedAt: Date;
            })[];
        } & {
            id: string;
            name: string;
            photo: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: string;
        name: string;
        password: string;
        photo: string;
    }>;
}
