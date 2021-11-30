import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/connection";
import Person from "../types/ModelPerson";
interface PersonCreationAttributes extends Optional<Person, "id_persona"> {}
interface PersonIntance extends Model<Person, PersonCreationAttributes> {}

const Person = db.define<PersonIntance>(
  "persona",
  {
    id_persona: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    celular: {
      type: DataTypes.STRING,
    },
    whatsapp: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    tableName: "persona",
  }
);
export default Person;
