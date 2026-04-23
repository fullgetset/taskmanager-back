import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { UserEntity } from 'src/user/entity/user.entity';

type RequestWithUser = Request & { user: UserEntity };

export const Authorized = createParamDecorator(
  (data: keyof UserEntity, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return data ? user[data] : user;
  },
);
