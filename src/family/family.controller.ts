import { Body, Controller, Delete, Get, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { FamilyService } from './family.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateDTO, RequestDTO } from 'src/DTO/family';
import { Payload } from 'src/jwt-strategy';

@Controller('family')
export class FamilyController {
    constructor(
        private readonly service: FamilyService
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async get(@Request() { user }: { user: Payload }, @Query('familyId') familyId: string){
        return await this.service.get(user, familyId)
    }

    @Get('/all')
    @UseGuards(JwtAuthGuard)
    async getAll(){
        return await this.service.getAll()
    }

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    async create(@Request() { user }: { user: Payload }, @Body() data: CreateDTO) {
        return await this.service.create(user, data)
    }

    @Put('/head')
    @UseGuards(JwtAuthGuard)
    async updateHead(@Request() { user }: { user: Payload }, @Query('familyId') familyId: string, @Query('newHeadId') newHeadId: string){
        return await this.service.updateHead(user, newHeadId, familyId)
    }

    @Post('/request')
    @UseGuards(JwtAuthGuard)
    async request(@Request() { user }: { user: Payload }, @Query('familyId') familyId: string, @Body() {about}: RequestDTO){
        return await this.service.request(user, familyId, {about})
    }

    @Post('/invite')
    @UseGuards(JwtAuthGuard)
    async invite(@Request() { user }: { user: Payload }, @Query('familyId') familyId: string, @Query('userId') userId: string, @Body() {about}: RequestDTO){
        return await this.service.invite(user, userId, familyId, {about})
    }

    @Get('/invite')
    @UseGuards(JwtAuthGuard)
    async getInvitation(@Request() { user }: { user: Payload }){
        return await this.service.getInvitation(user)
    }

    @Get('/request')
    @UseGuards(JwtAuthGuard)
    async getRequest(@Request() { user }: { user: Payload }, @Query('familyId') familyId: string){
        return await this.service.getRequest(user, familyId)
    }

    @Put('/accept')
    @UseGuards(JwtAuthGuard)
    async accept(@Request() { user }: { user: Payload }, @Query('familyId') familyId: string, @Query('id') id: string){
        return await this.service.accept(user, familyId, id)
    }

    @Delete('/decline')
    @UseGuards(JwtAuthGuard)
    async decline(@Request() { user }: { user: Payload }, @Query('familyId') familyId: string, @Query('id') id: string){
        return await this.service.decline(user, familyId, id)
    }
}