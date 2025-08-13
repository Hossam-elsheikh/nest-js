import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserInterface } from '../interfaces/active-user.interface';

export const AcitveUser = createParamDecorator(
  (field: keyof ActiveUserInterface | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user :ActiveUserInterface= request.user;

    return field ? user?.[field] : user;
  },
);
