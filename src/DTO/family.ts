import { IsString } from "class-validator";

export class CreateDTO{

    @IsString()
    name: string
    @IsString()
    photo: string
}

export class RequestDTO{

    @IsString()
    about: string
}