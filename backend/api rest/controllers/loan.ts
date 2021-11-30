import { Response } from "express";

import RequestCustom from "../types/Request";
import Person from "../models/person";
import Loan from "../models/loan";
import Payment from "../models/payment";
export const getLoans = async (req: RequestCustom, res: Response) => {
  const id_usuario: string = req.userId as string;
  if (!id_usuario) {
    return res.status(400).json({
      message: "Se requiere token",
    });
  }

  try {
    const loans = await Loan.findAll({
      where: {
        id_usuario,
      },
      include: [Person],
    });
    if (loans.length === 0 || !loans) {
      return res.status(400).json({
        message: "No se encontraron prestamos",
      });
    }
    return res.status(200).json({
      data: loans,
      message: "Prestamos encontrados",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al obtener los prestamos",
    });
  }
};

export const getLoan = async (req: RequestCustom, res: Response) => {
  const id_prestamo: string = req.params.id_prestamo;
  const id_usuario: string = req.userId as string;
  if (!id_usuario) {
    return res.status(400).json({
      message: "Se requiere token",
    });
  }

  if (!id_prestamo) {
    return res.status(400).json({
      message: "Se requiere identificado de prestamo",
    });
  }

  try {
    const loan = await Loan.findOne({
      where: {
        id_prestamo,
        estado: true,
      },
      include: [Person],
    });
    if (!loan) {
      return res.status(400).json({
        message: "No se encontrado prestamo",
      });
    }
    return res.status(200).json({
      data: loan,
      message: "Prestamos encontrados",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al obtener los prestamos",
    });
  }
};

export const postLoan = async (req: RequestCustom, res: Response) => {
  let id_usuario: string = req.userId as string;

  const {
    id_persona,
    monto,
    porcentaje,
    fecha_inicio,
    fecha_fin,
    empenio,
    estado_prestamo,
  } = req.body;
  if (!id_usuario) {
    return res.status(400).json({
      message: "Se requiere token",
    });
  }
  if (
    !id_persona ||
    !monto ||
    !porcentaje ||
    !fecha_inicio ||
    !empenio ||
    !estado_prestamo
  ) {
    return res.status(400).json({
      message: "Se requiere todos los campos",
    });
  }
  try {
    const person = await Person.findByPk(id_persona);
    if (!person) {
      return res.status(400).json({
        message: "No se encontro la persona",
      });
    }
    const loan = await Loan.create({
      id_usuario: parseInt(id_usuario),
      id_persona,
      monto,
      porcentaje,
      fecha_inicio,
      fecha_fin,
      empenio,
      estado_prestamo,
      estado: true,
    });
    await loan.save();
    return res.status(201).json({
      data: loan,
      message: "Prestamo creado",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al crear el prestamo",
    });
  }
};

export const putLoan = async (req: RequestCustom, res: Response) => {
  // tslint:disable-next-line: variable-name
  const id_usuario: string = req.userId as string;
  const id_prestamo = req.params.id_prestamo;
  const {
    id_persona,
    monto,
    porcentaje,
    fecha_inicio,
    fecha_fin,
    empenio,
    estado_prestamo,
  } = req.body;
  if (!id_prestamo) {
    return res.status(400).json({
      message: "Se requiere identificador de prestamo",
    });
  }
  if (!id_usuario) {
    return res.status(400).json({
      message: "Se requiere token",
    });
  }
  if (
    !id_persona ||
    !monto ||
    !porcentaje ||
    !fecha_inicio ||
    !empenio ||
    !estado_prestamo
  ) {
    return res.status(400).json({
      message: "Se requiere todos los campos",
    });
  }
  try {
    const person = await Person.findByPk(id_persona);
    if (!person) {
      return res.status(400).json({
        message: "No se encontro la persona",
      });
    }
    const loan = await Loan.update(
      {
        // tslint:disable-next-line: radix
        id_usuario: parseInt(id_usuario),
        id_persona,
        monto,
        porcentaje,
        fecha_inicio,
        fecha_fin,
        empenio,
        estado_prestamo,
      },
      {
        where: {
          id_prestamo,
        },
      }
    );
    if (loan[0] === 0) {
      return res.status(400).json({
        message: "No se encontro el prestamo",
      });
    }
    return res.status(200).json({
      data: loan[0],
      message: "Prestamo actualizado",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al crear el prestamo",
    });
  }
};
export const deleteLoan = async (req: RequestCustom, res: Response) => {
  const id_prestamo = req.params.id_prestamo;
  const id_usuario: string = req.userId as string;
  if (!id_usuario) {
    return res.status(400).json({
      message: "Se requiere token",
    });
  }
  if (!id_prestamo) {
    return res.status(400).json({
      message: "Se requiere identificador de prestamo",
    });
  }
  try {
    const loan = await Loan.update(
      {
        estado: false,
      },
      {
        where: {
          id_prestamo,
        },
      }
    );
    if (loan[0] === 0) {
      return res.status(400).json({
        message: "No se encontro el prestamo",
      });
    }
    return res.status(200).json({
      data: loan[0],
      message: "Prestamo eliminado",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al crear el prestamo",
    });
  }
};

export const getPaymentsLoan = async (req: RequestCustom, res: Response) => {
  const id_prestamo = req.params.id_prestamo;
  const id_usuario: string = req.userId as string;
  if (!id_usuario) {
    return res.status(400).json({
      message: "Se requiere token",
    });
  }
  if (!id_prestamo) {
    return res.status(400).json({
      message: "Se requiere identificador de prestamo",
    });
  }
  try {
    const payments = await Payment.findAll({
      where: {
        id_prestamo,
        estado: true,
      },
      include: [Loan],
    });
    if (!payments || payments.length === 0) {
      return res.status(400).json({
        message: "No se encontraron pagos",
      });
    }
    return res.status(200).json({
      data: payments,
      message: "Pagos encontrados",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al obtener los pagos",
    });
  }
};
