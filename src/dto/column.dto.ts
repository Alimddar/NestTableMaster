import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  type: string;
}
