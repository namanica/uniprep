import { PartialType } from '@nestjs/mapped-types';
import { CreateDbFillDto } from './create-db_fill.dto';

export class UpdateDbFillDto extends PartialType(CreateDbFillDto) {}
