import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { type Metrix } from './interfaces';
import { ProgressTrackerService } from './progress_tracker.service';

@Controller('progress-tracker')
export class ProgressTrackerController {
    constructor(private progressTrackerService: ProgressTrackerService) { }

    @Get('get-all-metrix')
    async getMetrix() {
        return this.progressTrackerService.getMetrix()
    }

    @Post('get-by-id-metrix')
    async getMetrixById(@Body() body: { id: string }) {
        return this.progressTrackerService.getMetrixById(body)
    }

    @Post('create-metrix')
    async addMetrix(@Body() body: Metrix) {
        return this.progressTrackerService.addMetrix(body)
    }

    @Put('updateMetrix')
    async updateMetrix(@Body() body: Partial<Metrix> & { id: string }) {
        return this.progressTrackerService.updateMetrix(body)
    }

    @Delete('deleteMerix')
    async deleteMetrix(@Body() body: { id: string }) {
        return this.progressTrackerService.deleteMetrix(body)
    }
}
