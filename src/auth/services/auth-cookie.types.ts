import type { Response } from 'express';

export interface setAuthTokensProps {
  res: Response;
  accessToken: string;
  refreshToken: string;
  expiresAccessToken: Date;
  expiresRefreshToken: Date;
}
