import { DetalleVenta, Venta } from "@/types/sale";
import { create } from "zustand";

interface SaleStore {
  path: string;
  sale: Venta;
  sales: [] | Venta[];
  detalles:  DetalleVenta[]
  saveSale: () => void;
  allSales: () => void;
  findSales: (ven_id: number) => Promise<{ sales: Venta[] }>;
}

export const dataTem: Venta = {
  id: 0,
  cliente_id: 0,
  detalle: [],
  fecha: "",
  moneda: "COP",
  monto_total: 0,
  sucursal_id: 0,
  vendedor_id: 0,
};

export const detalleVenta:DetalleVenta={
  cantidad:0,
  precio_unitario:0,
  producto_id:0,
  subtotal:0,
  nombre_producto:""
}

export const SaleStore = create<SaleStore>((set, get) => ({
  path: "ventas",
  sale: dataTem,
  sales: [],
  detalles:[detalleVenta,detalleVenta],
  saveSale: async () => {
    const state = get();
    state.sale.detalle=state.detalles
    set((state) => {
      if (state.sale) {
        fetch("/api/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: state.sale, path: state.path }),
        });
        state.detalles=[]
        state.sale.monto_total=0
        return { sale: dataTem };
      }
      return state;
    });
  },

  allSales: async () => {
    const state = get();
    const response = await fetch(`/api/data?path=${encodeURIComponent(state.path)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const sales: Venta[] = await response.json();

      set(() => ({ sales }));
    } else {
      console.error("Failed to fetch sales:", await response.json());
    }
  },

  findSales: async (ven_id: number) => {
    const state = get();
    const response = await fetch(`/api/sales?path=${encodeURIComponent(state.path)}`);
    const sales: Venta[] = await response.json();

    const filteredSales = sales.filter((sale: Venta) => sale.vendedor_id === ven_id);
    set(() => ({
      sales: filteredSales,
    }));

    return { sales: filteredSales };
  },
}));
