import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/connection";
import Loan from "../types/ModelLoan";
import Person from "./person";
import User from "./user";

interface LoanCreationAttributes extends Optional<Loan, "id_prestamo"> {}
interface LoanIntance extends Model<Loan, LoanCreationAttributes> {}

const Loan = db.define<LoanIntance>(
  "prestamo",
  {
    id_prestamo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_persona: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    porcentaje: {
      type: DataTypes.FLOAT,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
    },
    fecha_fin: {
      type: DataTypes.DATE,
    },
    empenio: {
      type: DataTypes.STRING,
    },
    estado_prestamo: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    tableName: "prestamo",
  }
);

Loan.belongsTo(Person, { foreignKey: "id_persona" });
Person.hasMany(Loan, { foreignKey: "id_persona" });

Loan.belongsTo(User, { foreignKey: "id_usuario" });
User.hasMany(Loan, { foreignKey: "id_usuario" });
export default Loan;
