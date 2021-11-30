import { Response } from "express";
import bcryptjs from "bcryptjs";

import User from "../models/user";
import Person from "../models/person";
import CustomRequest from "../types/Request";

export const getUsers = async (req: CustomRequest, res: Response) => {
  res.json({
    message: "get blog",
  });
};

export const getUser = (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  res.json({
    message: "get blog",
    id,
  });
};
export const postUser = (req: CustomRequest, res: Response) => {
  const { body } = req;
  res.json({
    message: "post blog",
    body,
  });
};

export const putUser = async (req: CustomRequest, res: Response) => {
  const { id_usuario } = req.params;
  const { username, clave, clave_antigua } = req.body;
  if (!username || !clave || !clave_antigua) {
    return res.status(400).json({
      message: "Se require datos",
    });
  }
  const user: any = await User.findByPk(id_usuario);
  if (!user || user.estado === false) {
    return res.status(400).json({
      message: "Usuario no encontrado",
    });
  }
  if (!bcryptjs.compareSync(clave_antigua, user.clave)) {
    return res.status(400).json({
      message: "Clave antigua incorrecta",
    });
  }

  user.username = username;
  const salt: string = bcryptjs.genSaltSync(10);
  console.log(salt);
  const hash = bcryptjs.hashSync(clave, salt);
  console.log(hash);

  user.clave = hash;
  await user.save();
  res.json({
    message: "Datos del usuario actualizados",
    data: {
      username,
    },
  });
};

export const deleteUser = (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  console.log(req.user);
  res.json({
    message: "delete blog",
    id: req.userId,
    user: req.user,
  });
};
