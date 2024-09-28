import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateCatDto {

  @ApiProperty({
    description: 'The name of the cat',
    example: 'Whiskers',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The age of the cat',
    example: 3,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  age: number;

  @ApiProperty({
    description: 'The breed of the cat',
    example: 'Siamese',
  })
  @IsString()
  @IsNotEmpty()
  breed: string;
}
