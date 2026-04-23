import { Injectable } from '@nestjs/common';
import type { Request } from 'express';

import type {
  ClearCookieOptions,
  CookieType,
  SetCookieOptions,
} from './cookie.types';

@Injectable()
export class CookieService {
  constructor() {}

  setCookie({ res, name, value, options }: SetCookieOptions) {
    res.cookie(name, value, options);
  }

  clearCookie({ res, name, options }: ClearCookieOptions) {
    res.clearCookie(name, options);
  }

  getCookie(req: Request, name: string) {
    const cookies = req.cookies as CookieType;

    return cookies?.[name] ?? null;
  }
}
