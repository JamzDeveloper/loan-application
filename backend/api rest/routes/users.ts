import { Router } from "express";
import { check } from "express-validator";

import {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/users";
import validateJwt from "../middlewares/validate-jwt";
import validateFields from "../middlewares/validate-fields";
const router = Router();
router.get("/", getUsers);
router.put("/:id_usuario", [validateJwt, validateFields], putUser);
router.delete("/:id", [validateJwt, validateFields], deleteUser);

export default router;
