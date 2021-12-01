import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/connection";
import Person from "./person";
import User from "../types/ModelUser";
import Rol from "./role";
/*
interface UserAttributes {
  id_usuario: number;
  id_persona: number;
  username: string;
  clave: string;
  estado: boolean;
}*/
interface UserCreationAttributes extends Optional<User, "id_usuario"> {}

interface UserInstance extends Model<User, UserCreationAttributes>, User {}

const User = db.define<UserInstance>(
  "usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_persona: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    tableName: "usuario",
  }
);

User.belongsTo(Person, { foreignKey: "id_persona" });
Person.hasMany(User, { foreignKey: "id_persona" });
// User.hasMany(Person, { foreignKey: "id_persona" });
// Person.belongsTo(User, { foreignKey: "id_persona" });


User.belongsTo(Rol, { foreignKey: "id_rol" });
Rol.hasMany(User, { foreignKey: "id_rol" });


export default User;
