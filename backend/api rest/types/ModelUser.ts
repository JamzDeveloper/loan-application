export default interface User {
  id_usuario?: number;
  id_persona?: number;
  id_rol?: number;
  username: string;
  clave: string;
  estado?: boolean;
}
