import { PartialType } from '@nestjs/swagger';
import { TechnicalDto } from './create-technical.dto';

export class UpdateTechnicalDto extends PartialType(TechnicalDto) {}
