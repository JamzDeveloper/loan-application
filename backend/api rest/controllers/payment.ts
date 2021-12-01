import { Response } from "express";
import RequestCustom from "../types/Request";
import Payment from "../models/payment";
import Loan from "../models/loan";
import User from "../models/user";
import Role from "../models/role";
export const getPayments = async (req: RequestCustom, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Se requiere token ",
    });
  }
  try {
    const payments = await Payment.findAll({ where: { estado: true } });
    if (payments.length === 0 || !payments) {
      return res.status(404).json({
        message: "No hay pagos",
      });
    }
    return res.json({
      data: payments,
      message: "Lista de pagos",
    });
  } catch (err) {
    return res.status(500).json({
      message: "error al obtener pagos",
    });
  }
};
export const getPayment = async (req: RequestCustom, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Se requiere token ",
    });
  }
  const { id_pago } = req.params;
  try {
    const payment = await Payment.findOne({ where: { id_pago, estado: true } });
    if (!payment) {
      return res.status(404).json({
        error: "No se encontro el pago",
      });
    }
    return res.json({
      data: payment,
      message: "Pago econtrado",
    });
  } catch (err) {
    return res.status(500).json({
      message: "error al obtener pago",
    });
  }
};
export const postPayment = async (req: RequestCustom, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Se requiere token ",
    });
  }
  const user: any = await User.findByPk(userId, {
    include: [Role],
  });

  if (user.rol.nombre === "ADMINISTRADOR") {
    return res.status(400).json({
      message: "No tiene permisos para realizar esta acción",
    });
  }
  if (!user) {
    return res.status(400).json({
      message: "No se encontro usuario",
    });
  }
  const { id_prestamo, monto, fecha, comentario } = req.body;
  if (!id_prestamo || !monto || !fecha || !comentario) {
    return res.status(400).json({
      message: "Se requiere todos los campos",
    });
  }
  try {
    const loan = await Loan.findOne({ where: { id_prestamo, estado: true } });
    if (!loan) {
      return res.status(404).json({
        message: "No se encontro el prestamo",
      });
    }
    const payment = await Payment.create({
      id_prestamo,
      monto,
      fecha,
      comentario,
      estado: true,
    });
    payment.save();
    return res.json({
      data: payment,
      message: "Pago creado",
    });
  } catch (err) {
    return res.status(500).json({
      message: "error al crear pago",
    });
  }
};
export const putPayment = async (req: RequestCustom, res: Response) => {
  const userId = req.userId;
  const { id_pago } = req.params;

  if (!userId) {
    return res.status(400).json({
      message: "Se requiere token ",
    });
  }
  const user: any = await User.findByPk(userId, {
    include: [Role],
  });

  if (user.rol.nombre === "ADMINISTRADOR") {
    return res.status(400).json({
      message: "No tiene permisos para realizar esta acción",
    });
  }
  if (!user) {
    return res.status(400).json({
      message: "No se encontro usuario",
    });
  }
  if (!id_pago) {
    return res.status(400).json({
      message: "Se requiere identifacador de pago",
    });
  }
  const { id_prestamo, monto, fecha, comentario } = req.body;
  if (!id_prestamo || !monto || !fecha || !comentario) {
    return res.status(400).json({
      message: "Se requiere todos los campos",
    });
  }
  try {
    const loan = await Loan.findOne({ where: { id_prestamo, estado: true } });
    if (!loan) {
      return res.status(404).json({
        message: "No se encontro el prestamo",
      });
    }
    const payment = await Payment.update(
      {
        monto,
        fecha,
        comentario,
        estado: true,
      },
      { where: { id_pago, estado: true } }
    );

    if (payment[0] === 0) {
      return res.status(404).json({
        data: payment[0],
        message: "No se pudo actualizar el pago",
      });
    }
    return res.json({
      data: payment[0],
      message: "Pago actualizado",
    });
  } catch (err) {
    return res.status(500).json({
      message: "error al actualizar pago",
    });
  }
};
export const deletePayment = async (req: RequestCustom, res: Response) => {
  const userId = req.userId;
  const { id_pago } = req.params;

  if (!userId) {
    return res.status(400).json({
      message: "Se requiere token ",
    });
  }
  if (!id_pago) {
    return res.status(400).json({
      message: "Se requiere identifacador de pago",
    });
  }
  try {
    const payment = await Payment.update(
      {
        estado: false,
      },
      { where: { id_pago, estado: true } }
    );
    if (payment[0] === 0) {
      return res.status(404).json({
        data: payment[0],
        message: "No se pudo eliminar el pago",
      });
    }
    return res.json({
      data: payment[0],
      message: "Pago eliminado",
    });
  } catch (err) {
    return res.status(500).json({
      message: "error al eliminar pago",
    });
  }
};
