import { ApiProperty } from '@nestjs/swagger';

export class TableDto {
  @ApiProperty()
  tableName: string;
}
