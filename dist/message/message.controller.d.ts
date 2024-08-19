import { MessageService } from './message.service';
import { Payload } from 'src/jwt-strategy';
import { SendDTO } from 'src/DTO/message';
export declare class MessageController {
    private readonly service;
    constructor(service: MessageService);
    send({ user }: {
        user: Payload;
    }, familyId: string, data: SendDTO): Promise<void>;
    get({ user }: {
        user: Payload;
    }, familyId: string): Promise<({
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
