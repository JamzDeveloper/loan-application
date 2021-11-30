import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import ModelUser from "../types/ModelUser";
interface Auth extends Request {
  userId?: string;
  user?: ModelUser;
}

const validateJwt = async (req: Auth, res: Response, next: NextFunction) => {
  const token = req.header("token");
  console.log(token);
  if (!token) {
    return res.status(400).json({
      message: "Se requiere de token",
    });
  }
  try {
    const { userId } = jwt.verify(
      token,
      `${process.env.SECRETORPRIVATEKEY}`
    ) as {
      userId: string;
    };
    console.log(userId);
    // leer el usuario que corresponde al id
    const user = await User.findByPk(userId, {
      rejectOnEmpty: false,
    });

    if (!user) {
      return res.status(404).json({
        message: "Token no valido - usuario no existe",
      });
    }

    // verificamos estado del usuario
    if (!user.estado) {
      return res.status(401).json({
        msg: "Token no valido - usuario con estado : false",
      });
    }
    req.user = user;
    req.userId = userId;

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Token invalido",
    });
  }
};

export default validateJwt;
