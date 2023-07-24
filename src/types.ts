import { RequestHandler } from 'express';

export type MiddlewareErrorCreator = {
  method: string;
  log: string;
  status: string | number;
  message?: string;
};

export type MiddlewareController = {
  [s: string]: RequestHandler;
};
