import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { $Enums } from "@prisma/client";
import { ROLES_KEY } from "src/decorators/role";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<$Enums.RoleName[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log("required roles", requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log("can activate request", request.user);

    return requiredRoles.some((role) => request.user.roles?.includes(role));
  }
}
