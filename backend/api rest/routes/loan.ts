import { Router } from "express";
import validateJwt from "../middlewares/validate-jwt";
import validateFields from "../middlewares/validate-fields";
import {
  getLoans,
  getLoan,
  postLoan,
  putLoan,
  deleteLoan,
  getPaymentsLoan,
} from "../controllers/loan";

const router = Router();

router.get("/", [validateJwt, validateFields], getLoans); // obtenern todos los prestamos
router.get("/:id_prestamo", [validateJwt, validateFields], getLoan); // obtener un prestamo por id

router.post("/", [validateJwt, validateFields], postLoan); // crear un prestamo
router.put("/:id_prestamo", [validateJwt, validateFields], putLoan); // actualizar un prestamo
router.delete("/:id_prestamo", [validateJwt, validateFields], deleteLoan); // eliminar un prestamo
//
router.get(
  "/:id_prestamo/pagos",
  [validateJwt, validateFields],
  getPaymentsLoan
); // obtener todos los pagos de un prestamo

export default router;
