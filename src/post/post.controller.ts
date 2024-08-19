import { Body, Controller, Get, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { Payload } from 'src/jwt-strategy';
import { CreateDTO, ReactDTO } from 'src/DTO/post';

@Controller('post')
export class PostController {
    constructor(
        private readonly service: PostService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Request() {user}: {user: Payload}, @Body() data: CreateDTO){
        return await this.service.create(user, data)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(){
        return await this.service.getAll()
    }

    @Get('/one')
    @UseGuards(JwtAuthGuard)
    async getOne(@Query('id') id: string){
        return await this.service.getOne(id)
    }

    @Post('/react')
    @UseGuards(JwtAuthGuard)
    async react(@Request() {user}: {user: Payload}, @Body() data: ReactDTO){
        return await this.service.react(user, data)
    }
}