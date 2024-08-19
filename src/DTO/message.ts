import { IsString, ValidateIf } from "class-validator"

export class SendDTO{

    @ValidateIf((o: SendDTO) => !o.photo)
    @IsString()
    text: string;
  
    @ValidateIf((o: SendDTO) => !o.text)
    @IsString()
    photo: string;
}