import {Request } from "express";

export interface MyContext {
  req: Request & { session: Express.Session };
}