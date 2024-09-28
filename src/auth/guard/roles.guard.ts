import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';
import { Role } from "../../common";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean {

    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!role) {

      return true;
    }

    const { user } = context.switchToHttp().getRequest();


    if (user.role === Role.ADMIN) {
      return true;
    }

    return role === user.role;
  }
}
