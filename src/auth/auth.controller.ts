import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Auth, Roles } from './decorators';
import { ActiveUser, Role, UserActiveInterface } from '../common';

interface RequestWithUser extends Request {
  user: { email: string; role: string };
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiBearerAuth()
  @Auth(Role.ADMIN)
  register(
    @Body() registerDto: RegisterDto
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user and return a JWT token' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in. Returns a JWT token.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid credentials or input data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  login(
    @Body() loginDto: LoginDto
  ) {
    return this.authService.login(loginDto);
  }


  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'The user profile' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  // controlador
  @Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }

}
