import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {

  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    required: false,
    type: Number,
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    example: 5,
    required: false,
    type: Number,
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 5;
}