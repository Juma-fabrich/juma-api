import { UserService } from './user.service';
import { Payload } from 'src/jwt-strategy';
import { AuthDTO } from 'src/DTO/user';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    login(data: AuthDTO): Promise<{
        token: string;
    }>;
    signup(data: AuthDTO): Promise<{
        id: string;
        name: string;
        password: string;
        photo: string;
    }>;
    search(query: string): Promise<{
        id: string;
        name: string;
        password: string;
        photo: string;
    }[]>;
    auth({ user }: {
        user: Payload;
    }): Promise<{
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
