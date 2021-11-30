import { Router } from "express";
import { check } from "express-validator";
import {
  postPerson,
  getPersons,
  deletePerson,
  putPerson,
} from "../controllers/persons";
import validateJwt from "../middlewares/validate-jwt";
import validateFields from "../middlewares/validate-fields";
import { existPerson } from "../helpers/db-validate";
const router = Router();
// TODO: falta validar el dni
router.post(
  "/",
  [
    validateJwt,
    check("nombre", "Se requiere nombre").not().isEmpty(),
    check("apellido", "Se requiere apellido").not().isEmpty(),
    check("dni", "Se requiere cedula")
      .not()
      .isEmpty()
      .isLength({ min: 8, max: 8 }),
    //    check("dni").custom(existPerson),
    check("direccion", "Se requiere direccion").not().isEmpty(),
    validateFields,
  ],
  postPerson
);
router.get("/", [validateJwt, validateFields], getPersons);
router.get("/:id_persona", [validateJwt, validateFields], getPersons);
router.put("/:id_persona", [validateJwt, validateFields], putPerson);
router.delete("/:id_persona", [validateJwt, validateFields], deletePerson);

export default router;
