import { Body, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as interfaces from './interfaces';
import { Metrix } from './interfaces';

@Injectable()
export class ProgressTrackerService {
    constructor(private prisma: PrismaClient) { }

    async getMetrix() {
        const metrics = await this.prisma.progress.findMany();
        return {
            message: "Here are your metrics",
            data: metrics,
        };
    }

    async getMetrixById(@Body() body: { id: string }) {
        const metric = await this.prisma.progress.findUnique({
            where: { id: body.id },
        });

        return {
            message: `Metric with id ${body.id}`,
            data: metric,
        };
    }

    async addMetrix(@Body() body: interfaces.Metrix) {
        const newMetric = await this.prisma.progress.create({
            data: {
                user_id: body.user_id,
                completed_topics: body.completed_topics,
                accuracy_rate: body.accuracy_rate,
                time_spent: body.time_spent,
                updated_at: body.updated_at,
            },
        });

        return {
            message: "Metric added successfully",
            data: newMetric,
        };
    }

    async updateMetrix(@Body() body: Partial<Metrix> & { id: string }) {
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
    }

    async deleteMetrix(@Body() body: { id: string }) {
        const deleted = await this.prisma.progress.delete({
            where: { id: body.id },
        });

        return {
            message: `Metric with id ${body.id} deleted`,
            data: deleted,
        };
    }
}