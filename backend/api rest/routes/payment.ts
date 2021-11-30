import { Router } from "express";
import { check } from "express-validator";

import validateJwt from "../middlewares/validate-jwt";
import validateFields from "../middlewares/validate-fields";
import {
  getPayments,
  getPayment,
  postPayment,
  putPayment,
  deletePayment
} from "../controllers/payment";

const router = Router();

router.get("/", [validateJwt, validateFields], getPayments);
router.get("/:id_pago", [validateJwt, validateFields], getPayment);
router.post(
  "/",
  [
    validateJwt,
    check("id_prestamo", "El id_prestamo es obligatorio").not().isEmpty(),
    check("monto", "El monto es obligatorio").not().isEmpty(),
    check("fecha", "La fecha es obligatoria").not().isEmpty(),
    validateFields,
  ],
  postPayment
);
router.put(
  "/:id_pago",
  [
    validateJwt,
    check("id_prestamo", "El id_prestamo es obligatorio").not().isEmpty(),
    check("monto", "El monto es obligatorio").not().isEmpty(),
    check("fecha", "La fecha es obligatoria").not().isEmpty(),
    validateFields,
  ],
  putPayment
);
router.delete(
    "/:id_pago",
    [
        validateJwt,
        validateFields,
    ],
    deletePayment
);
export default router;
