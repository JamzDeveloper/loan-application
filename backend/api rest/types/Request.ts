import { Request } from "express";
import ModelUser from "./ModelUser";
export default interface Auth extends Request {
  userId?: string;
  user?: ModelUser;
}
