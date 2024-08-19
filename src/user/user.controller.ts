import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { Payload } from 'src/jwt-strategy';
import { AuthDTO } from 'src/DTO/user';

@Controller('user')
export class UserController {
    constructor(
        private readonly service: UserService
    ){}

    @Post('/login')
    async login(@Body() data: AuthDTO){
        return await this.service.login(data)
    }

    @Post('/signup')
    async signup(@Body() data: AuthDTO){
        return await this.service.signUp(data)
    }

    @Get('/search')
    @UseGuards(JwtAuthGuard)
    async search(@Query('query') query: string){
        return await this.service.search(query)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async auth(@Request() {user}: {user: Payload}){
        return await this.service.auth(user)
    }
}