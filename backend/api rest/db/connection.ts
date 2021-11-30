import { Sequelize } from "sequelize";

const db = new Sequelize("prestamos", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
