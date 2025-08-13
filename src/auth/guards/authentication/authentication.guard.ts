import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer; // setting a default auth type
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  >;
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  }
  // excution context job is Identifying the exact method & class being called so metadata can be read (auth type).
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // authTypes from the reflector
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(), // get all authType assigned to a handler or the class controller if not in the handler
    ]) ?? [AuthenticationGuard.defaultAuthType]; // set the default type if not provided

    // arr of guards
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();

    const error = new UnauthorizedException();
    // loop guards canActivate
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context), // passing to other guards
      ).catch((err) => {
        error: err;
      });
      if (canActivate) {
        return true;
      }
    }
    throw error;
  }
}

// Incoming Request
//        │
//        ▼
//  AuthenticationGuard.canActivate(context)
//        │
//        ├─ context.getHandler() → specific controller method
//        ├─ context.getClass() → controller class
//        │
//        └─ Reflector reads AUTH_TYPE_KEY from metadata
//             │
//             ▼
//    Pick correct guard(s) from authTypeGuardMap
//             │
//             ▼
//    For each guard → guard.canActivate(context)
//             │
//             ├─ context is reused so sub-guards can read request info
//             └─ if any guard returns true → allow request
//  */
