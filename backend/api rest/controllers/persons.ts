import { Request, Response } from "express";
import Person from "../models/person";
import CustomRequest from "../types/Request";
import PersonType from "../types/ModelPerson";

export const postPerson = async (req: CustomRequest, res: Response) => {
  console.log("posPerson");
  const { nombre, apellido, dni, celular, whatsapp, direccion } = req.body;
  if (!req.user || !req.userId) {
    return res.status(400).json({
      message: "Token no valido",
    });
  }
  if (!nombre || !apellido || !dni || !direccion) {
    return res.status(400).json({
      message: "Debe ingresar todos los datos",
    });
  }

  try {
    const person: PersonType | any = await Person.findOne({
      where: {
        dni,
      },
    });
    if (person) {
      person.celular = celular;
      person.whatsapp = whatsapp;
      person.direccion = direccion;
      person.estado = true;
      await person.save();
      return res.status(200).json({
        message: "Persona actualizada",
        data: person,
      });
    }
    const newPerson = await Person.create({
      nombre,
      apellido,
      dni,
      celular,
      whatsapp,
      direccion,
      estado: true,
    });
    await newPerson.save();
    return res.status(201).json({
      message: "Persona creada correctamente",
      data: newPerson,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al crear persona",
    });
  }
};

export const getPersons = async (req: CustomRequest, res: Response) => {
  const { id_persona } = req.params;
  try {
    console.log(id_persona);
    if (!id_persona) {
      return res.status(200).json({
        message: "Lista de personas",
        data: await Person.findAll({ where: { estado: true } }),
      });
    }
    return res.status(200).json({
      message: "Lista de personas",
      data: await Person.findOne({ where: { estado: true, id_persona } }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al listar personas",
    });
  }
};

export const putPerson = async (req: CustomRequest, res: Response) => {
  const { id_persona } = req.params;
  const { nombre, apellido, dni, celular, whatsapp, direccion } = req.body;
  try {
    const person: PersonType | any = await Person.findByPk(id_persona);
    console.log(person);
    if (!person || person.estado === false) {
      return res.status(404).json({
        message: "Persona no encontrada",
      });
    }
    person.nombre = nombre;
    person.apellido = apellido;
    person.dni = dni;
    person.celular = celular;
    person.whatsapp = whatsapp;
    person.direccion = direccion;
    await person.save();
    return res.status(200).json({
      message: "Persona actualizada",
      data: person,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al actualizar persona",
    });
  }
};
export const deletePerson = async (req: CustomRequest, res: Response) => {
  const { id_persona } = req.params;

  if (!req.user || !req.userId) {
    return res.status(400).json({
      message: "Token no valido",
    });
  }

  try {
    const person: any = await Person.findByPk(id_persona);

    if (!person.estado) {
      return res.status(400).json({
        message: "Persona no existe",
      });
    }
    person.estado = false;
    await person.save();
    res.json({
      data: person,
      message: "Persona eliminada correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al eliminar la persona",
    });
  }
};
