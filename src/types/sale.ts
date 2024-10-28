// /types/venta.ts
export type DetalleVenta = {
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
    nombre_producto:string
  };
  
  export type Venta = {
    id: number;
    fecha: string;
    vendedor_id: number;
    nombre_suscursal?:string,
    cliente_id: number;
    sucursal_id: number;
    monto_total: number;
    moneda: string;
    detalle: DetalleVenta[] | [];
  };
  