import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { Payload } from 'src/jwt-strategy';
import { SendDTO } from 'src/DTO/message';

@Controller('message')
export class MessageController {
    constructor(
        private readonly service: MessageService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async send(@Request() {user}: {user: Payload}, @Query('familyId') familyId: string, @Body() data: SendDTO){
        return await this.service.send(user, familyId, data)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async get(@Request() {user}: {user: Payload}, @Query('familyId') familyId: string){
        return await this.service.get(user, familyId)
    }
}