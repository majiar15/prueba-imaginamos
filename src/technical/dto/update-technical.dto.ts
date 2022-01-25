import { PartialType } from '@nestjs/swagger';
import { CreateTechnicalDto } from './create-technical.dto';

export class UpdateTechnicalDto extends PartialType(CreateTechnicalDto) {}
