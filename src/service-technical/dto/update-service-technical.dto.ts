import { PartialType } from '@nestjs/swagger';
import { ServiceTechnicalDto } from './create-service-technical.dto';

export class UpdateTechnicalDto extends PartialType(ServiceTechnicalDto) {}
