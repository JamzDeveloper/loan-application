import express, { application } from "express";
import cors from "cors";
import users from "../routes/users";
import person from "../routes/persons";
import db from "../db/connection";
import auth from "../routes/auth";
import loan from "../routes/loan";
import payment from "../routes/payment";
class Server {
  private app = application;
  private port: string;
  private paths = {
    user: "/api/usuario",
    person: "/api/persona",
    auth: "/api/auth",
    loan: "/api/prestamo",
    payment: "/api/pago",
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // conection to database
    this.dbConnection();
    // define middlewares
    this.middlewares();

    // define routes
    this.routes();
  }
  async dbConnection() {
    try {
      await db.authenticate();
      console.log("database online");
    } catch (error) {
      throw new Error("" + error);
    }
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.paths.user, users);
    this.app.use(this.paths.auth, auth);
    this.app.use(this.paths.person, person);
    this.app.use(this.paths.loan, loan);
    this.app.use(this.paths.payment, payment);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server on port", this.port);
    });
  }
}

export default Server;
