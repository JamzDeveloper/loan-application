export default interface Payment {
  id_pago?: number;
  id_prestamo?: number;
  monto: number;
  fecha: Date;
  comentario: string;
  estado: boolean;
}
