import User from "../models/user";
import Person from "../models/person";

export const existPerson = async (dni: string) => {
  const user = await Person.findOne({
    where: {
      dni,
    },
  });
  console.log(user);
  if (user) {
    throw new Error("Persona ya existe ");
  }
};
