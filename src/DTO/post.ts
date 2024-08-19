import { IsString, ValidateIf } from "class-validator"

export class CreateDTO{

    @ValidateIf((o: CreateDTO) => !o.photo)
    @IsString()
    text: string;
  
    @ValidateIf((o: CreateDTO) => !o.text)
    @IsString()
    photo: string;
}

export class ReactDTO{

    @IsString()
    postId: string
    @IsString({
        groups: ['like', 'cool', 'cute']
    })
    type: 'like' | 'cool' | 'nocare'
}