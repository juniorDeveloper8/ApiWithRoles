import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user. Minimum length is 6 characters',
    example: 'password123',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name: string;
}