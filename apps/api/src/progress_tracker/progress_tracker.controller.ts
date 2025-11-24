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

@Controller('progress-tracker')
export class ProgressTrackerController {
    constructor(private prisma: PrismaClient) { }

    @Get('get-all-metrix')
    async getMetrix() {
        try {
            const metrics = await this.prisma.progress.findMany();

            return {
                message: "Here are your metrics",
                data: metrics,
            };
        } catch (error) {
            throw new HttpException(
                { message: "Failed to fetch metrics", error: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('get-by-id-metrix')
    async getMetrixById(@Body() body: { id: string }) {
        try {
            const metric = await this.prisma.progress.findUnique({
                where: { id: body.id },
            });

            if (!metric) {
                throw new HttpException(
                    `Metric with id ${body.id} not found`,
                    HttpStatus.NOT_FOUND,
                );
            }

            return {
                message: `Metric with id ${body.id}`,
                data: metric,
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: "Failed to get metric",
                    error: error.message,
                },
                error instanceof HttpException
                    ? error.getStatus()
                    : HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('createMetrix')
    async addMetrix(@Body() body: Metrix) {
        try {
            const newMetric = await this.prisma.progress.create({
                data: {
                    user_id: body.user_id,
                    completed_topics: body.completed_topics,
                    accuracy_rate: body.accuracy_rate,
                    time_spent: body.time_spent,
                },
            });

            return {
                message: "Metric added successfully",
                data: newMetric,
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: "Failed to create metric",
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put('updateMetrix')
    async updateMetrix(@Body() body: Partial<Metrix> & { id: string }) {
        try {
            const updatedMetric = await this.prisma.progress.update({
                where: { id: body.id },
                data: {
                    user_id: body.user_id,
                    completed_topics: body.completed_topics,
                    accuracy_rate: body.accuracy_rate,
                    time_spent: body.time_spent,
                },
            });

            return {
                message: `Metric with id ${body.id} updated`,
                data: updatedMetric,
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: `Failed to update metric with id ${body.id}`,
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Delete('deleteMerix')
    async deleteMetrix(@Body() body: { id: string }) {
        try {
            const deleted = await this.prisma.progress.delete({
                where: { id: body.id },
            });

            return {
                message: `Metric with id ${body.id} deleted`,
                data: deleted,
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: `Failed to delete metric with id ${body.id}`,
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
