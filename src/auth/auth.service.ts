import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }


  async register({ name, email, password }: RegisterDto) {

    const user = await this.userService.findOneByEmail(email);


    if (user) {
      throw new BadRequestException('el usuario ya exite!!! 👻');
    }

    return await this.userService.create({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });
  }


  async login({ email, password }: LoginDto) {

    const user = await this.userService.findByEmailWintPassword(email);

    if (!user) {
      throw new UnauthorizedException('correo invalido!! 👻')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('password incorrecto!! 👻')
    }

    const payload = { email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email
    };
  }

  async profile({ email, role }: { email: string, role: string }) {



    return await this.userService.findOneByEmail(email);
  }
}
