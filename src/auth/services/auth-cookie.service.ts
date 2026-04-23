import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Response } from 'express';
import { CookieService } from 'src/common';
import { isDev } from 'src/utils/is-dev.util';
import { setAuthTokensProps } from './auth-cookie.types';

@Injectable()
export class AuthCookieService {
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly cookieService: CookieService,
  ) {
    this.COOKIE_DOMAIN = this.configService.getOrThrow('COOKIE_DOMAIN');
  }

  setAuthTokens({
    res,
    accessToken,
    refreshToken,
    expiresAccessToken,
    expiresRefreshToken,
  }: setAuthTokensProps) {
    this.cookieService.setCookie({
      res,
      name: 'accessToken',
      value: accessToken,
      options: { ...this.getCookieOptions(expiresAccessToken) },
    });

    this.cookieService.setCookie({
      res,
      name: 'refreshToken',
      value: refreshToken,
      options: { ...this.getCookieOptions(expiresRefreshToken) },
    });
  }

  clearAuthTokens(res: Response) {
    const cleared = { ...this.getCookieOptions(new Date(0)) };

    this.cookieService.clearCookie({
      res,
      name: 'accessToken',
      options: cleared,
    });

    this.cookieService.clearCookie({
      res,
      name: 'refreshToken',
      options: cleared,
    });
  }

  private getCookieOptions(expires: Date): CookieOptions {
    return {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    };
  }
}
