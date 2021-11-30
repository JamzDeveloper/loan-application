import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/connection";
import Payment from "../types/ModelPayment";
import Loan from "./loan";

interface PaymentCreationAttributes extends Optional<Payment, "id_prestamo"> {}
interface PaymentIntance extends Model<Payment, PaymentCreationAttributes> {}

const Payment = db.define<PaymentIntance>(
  "pago",
  {
    id_pago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_prestamo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    tableName: "pago",
  }
);

Payment.belongsTo(Loan, { foreignKey: "id_prestamo" });
Loan.hasMany(Payment, { foreignKey: "id_prestamo" });

export default Payment;
