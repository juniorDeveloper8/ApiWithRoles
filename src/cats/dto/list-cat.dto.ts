import { ApiProperty } from "@nestjs/swagger";

export class ListCatDto {

  @ApiProperty({
    description: 'The name of the cat',
    example: 'Whiskers',
  })
  name: string;

  @ApiProperty({
    description: 'The age of the cat',
    example: 3,
  })
  age: number;

  @ApiProperty({
    description: 'The breed of the cat',
    example: 'Siamese',
  })
  breed: string;
}

