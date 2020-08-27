import { MikroORM } from '@mikro-orm/core';
import { Request, Response } from 'express';

export interface Context {
  em: MikroORM['em'];
  req: Request & { session: Express.Session };
  res: Response;
}
