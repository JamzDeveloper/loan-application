import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/connection";

interface Role {
  id_rol: number;
  nombre: string;
}
interface RolCreationAttributes extends Optional<Role, "id_rol"> {}

interface RolInstance extends Model<Role, RolCreationAttributes>, Role {}

const role = db.define<RolInstance>(
  "rol",
  {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "rol",
  }
);

export default role;
