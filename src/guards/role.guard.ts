import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';

import { Role } from 'src/enums/role.enum';
import { ROLES_KEY } from 'src/role/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requeridRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requeridRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest();

    const rolesFilted = requeridRoles.filter(
      (role) => role === user.tokenPayload.role,
    );

    return rolesFilted.length > 0;
  }
}
