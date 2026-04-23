import type { CookieOptions, Response } from 'express';

export interface SetCookieOptions {
  res: Response;
  name: string;
  value: string;
  options: CookieOptions;
}

export type ClearCookieOptions = Omit<SetCookieOptions, 'value'>;

export interface CookieType {
  [key: string]: string | undefined;
}
