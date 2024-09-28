import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCatDto extends PartialType(CreateCatDto) {

  @ApiProperty({
    description: 'The unique identifier of the cat',
    example: 'a0b1c2d3-e4f5-6789-abcd-ef0123456789',
  })
  id: string;
}
