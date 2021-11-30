export default interface Loan {
  id_prestamo: number;
  id_usuario: number;
  id_persona: number;
  monto: number;
  porcentaje: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  empenio: string;
  estado_prestamo: string;
  estado: boolean;
}
