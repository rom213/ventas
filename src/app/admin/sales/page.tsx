"use client"

import { BranchStore } from "@/store/branch"
import { SaleStore } from "@/store/sale"
import { useEffect } from "react"

const page = () => {
  const saleStore=SaleStore()
  const branchStore=BranchStore()



  useEffect(() => {
    saleStore.allSales()
  }, [])
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-semibold">Sales</h1>
      <hr />
      <br />
      {saleStore.sales.map((data) => (
        <div
          key={data.id}
          className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {data.nombre_suscursal}
          </h1>
          <div className="text-xl">
            <span className="font-semibold">Nombre:</span> {data.nombre_cliente}
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Moneda:</span> {data.moneda}
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Fecha:</span> {data.fecha}
          </div>
          <div className="text-lg font-semibold text-gray-700 mt-2">
            Total: {data.monto_total}
          </div>
  
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Detalle:</h2>
            {data.detalle.map((detalle, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 rounded p-3 mb-2 border border-gray-200"
              >
                <div className="text-gray-700 font-medium">
                  {detalle.nombre_producto}
                </div>
                <div className="text-gray-600 text-sm">
                  Cantidad: {detalle.cantidad}
                </div>
                <div className="text-gray-600 text-sm">
                  Subtotal: {detalle.subtotal}
                </div>
                <div className="text-gray-600 text-sm">
                  Precio Unitario: {detalle.precio_unitario}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default page