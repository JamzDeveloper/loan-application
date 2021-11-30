import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import generateJwt from "../helpers/generate-jwt";
import User from "../models/user";
import Person from "../models/person";

interface DataFilter {
  id_usuario: number;
  username: string;
  id_persona: number;
  nombre: string;
  apellido: string;
  dni: string;
  celular: string;
  whatsapp: string;
  direccion: string;
  estado: boolean;
}

export const postLogin = async (req: Request, res: Response) => {
  const { clave, username } = req.body;
  if (!clave || !username) {
    return res.status(400).json({
      message: "Faltan datos",
    });
  }
  const data = await User.findAll({ include: Person });
  let { personas, ...datos }: any = data[0];
  // tslint:disable-next-line: prefer-const
  datos = datos.dataValues;

  if (username !== datos.username) {
    return res.status(400).json({
      message: "Usuario no encontrado",
    });
  }
  /*
  const salt: string = bcryptjs.genSaltSync(10);
  console.log(salt);
  const hash = bcryptjs.hashSync(clave, salt);

  console.log("hashhh");
  console.log(hash);
*/
  if (!bcryptjs.compareSync(clave, datos.clave)) {
    return res.status(400).json({
      message: "Clave incorrecta",
    });
  }

  // filtramos los datos que nos interesan y ordenamos
  const filtrar: String[] = ["id_usuario", "username"];
  let dataFilter: DataFilter = Object.keys(datos)
    .filter((key) => filtrar.includes(key))
    .reduce((obj: any, key: string) => {
      obj[key] = datos[key];
      return obj;
    }, {});

  dataFilter = {
    ...dataFilter,
    ...personas[0].dataValues,
  };

  const token = await generateJwt("" + dataFilter.id_usuario);

  res.json({
    data: dataFilter,
    jwt: token,
    message: "Acceso consedido",
  });
};
