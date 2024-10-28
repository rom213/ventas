"use client";
import { useEffect, useState } from "react";
import close from "../../../images/Recurso 15.png";
import { dataTem, detalleVenta, SaleStore } from "@/store/sale";
import { ProductStore } from "@/store/product";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

const Details = () => {
  const saleStore = SaleStore();
  const productStore = ProductStore();

  const [searchKey, setSearchKey] = useState("");
  const [render, setRender] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(
    null
  );
  const router=useRouter()

  const [errors, setErrors] = useState<{ nombre: string; cantidad: string }[]>(
    []
  );
  const [general, setErrorsGeneral] = useState(false);

  

  useEffect(() => {
    if (searchKey !== "") {
      productStore.findProducts(searchKey);
      setProducts(productStore.products || []);
    }
  }, [searchKey]);

  const handleSelectProduct = (product: Product) => {
    if (activeDetailIndex !== null) {
      saleStore.detalles[activeDetailIndex] = {
        ...saleStore.detalles[activeDetailIndex],
        nombre_producto: product.nombre,
        producto_id: product.id,
        precio_unitario: product.precio,
        cantidad:1,
        subtotal:product.precio
      };
    }
    saleStore.sale.monto_total = saleStore.detalles.reduce(
      (total, detalle) => total + detalle.subtotal,
      0
    );
    
    setSearchKey("");
  };

  const mathPriceForDetail = (quantity: string, index: number) => {
    saleStore.detalles[index] = {
      ...saleStore.detalles[index],
      cantidad: Number(quantity),
      subtotal: Number(quantity) * saleStore.detalles[index].precio_unitario,
    };
    saleStore.sale.monto_total = saleStore.detalles.reduce(
      (total, detalle) => total + detalle.subtotal,
      0
    );
    setRender(render + 1);
  };

  const handleDeleteDetail = (index: number) => {
    if (saleStore.detalles.length > 1) {
      saleStore.detalles.splice(index, 1);
    }
    setRender(render + 1);
  };

  const newDetail = () => {
    saleStore.detalles.push(detalleVenta);
    setErrors([...errors, { nombre: "", cantidad: "" }]);
    setRender(render + 1);
  };

  const validateFields = () => {
    if (saleStore.sale.cliente_id === 0 || saleStore.sale.sucursal_id === 0 || saleStore.detalles.length===0) {
      setErrorsGeneral(true);
      return
    } else {
      setErrorsGeneral(false);
    }
    const validationErrors = saleStore.detalles.map((detalle) => ({
      nombre: detalle.nombre_producto ? "" : "Product name is required.",
      cantidad:
        detalle.cantidad > 0 ? "" : "Quantity must be greater than zero.",
    }));

    setErrors(validationErrors);
    return validationErrors.every(
      (error) => error.nombre === "" && error.cantidad === ""
    );
  };

  const saveSale = () => {
    if (validateFields()) {
        saleStore.saveSale();
        setProducts([]);
        setSearchKey("");
        setErrors([]);
        setErrorsGeneral(false)
        router.push('/admin/sales')
        setRender(render + 1);
    }
};

  console.log("hollas");
  return (
    <div className="space-y-2">
      <div className="space-y-3">
        <div>
          <h3 className="text-4xl font-semibold">Details</h3>
        </div>
        <div className="w-full h-[0.1px] bg-black"></div>
      </div>
      {saleStore.detalles.map((detalle, index) => (
        <div key={index} className="grid sm:grid-cols-11 gap-2 lg:gap-10">
          <div className="col-span-5 relative">
            <div className="space-y-1 w-full">
              <label className="block text-xl font-medium text-[#99a4b6]">
                Name
              </label>
              <div>
                <input
                  value={
                    detalle.nombre_producto !== ""
                      ? detalle.nombre_producto
                      : undefined
                  }
                  onChange={(e) => {
                    setSearchKey(e.target.value);
                    saleStore.detalles[index].nombre_producto = "";
                    saleStore.detalles[index].producto_id = 0;
                    if (e.target.value !== "") setActiveDetailIndex(index);
                  }}
                  className="outline-none h-12 text-2xl px-5 w-full"
                />
                {errors[index]?.nombre && (
                  <p className="text-red-500 text-sm">{errors[index].nombre}</p>
                )}
              </div>
              {searchKey !== "" && activeDetailIndex === index && (
                <div
                  className="w-full bg-[#279aff] absolute max-h-[300px] overflow-auto rounded-b-lg shadow-lg z-50"
                  style={{ top: "100%", left: 0 }}
                >
                  {products.length === 0 && (
                    <div className="w-full text-center text-white">
                      Not found product
                    </div>
                  )}
                  {products.length !== 0 && (
                    <div className="grid gap-[1px] text-2x">
                      {products.map((product) => (
                        <div
                          onClick={() => handleSelectProduct(product)}
                          key={product.id}
                          className="h-12 bg-white cursor-pointer hover:bg-[#279aff] transition-all hover:text-white text-2xl flex items-center px-3"
                        >
                          <div>{product.nombre}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-5 grid grid-cols-3 gap-4 md:gap-8">
            <div className="space-y-1 w-full">
              <label className="block text-xl font-medium text-[#99a4b6]">
                Quantity
              </label>
              <div>
                <input
                  onChange={(e) =>
                    mathPriceForDetail(e.target.value, index)
                  }
                  type="number"
                  min="1"
                  defaultValue={1}
                  className="outline-none h-12 text-2xl px-5 w-full"
                />
                {errors[index]?.cantidad && (
                  <p className="text-red-500 text-sm">
                    {errors[index].cantidad}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-1 w-full">
              <label className="block text-xl font-medium text-[#99a4b6]">
                Price
              </label>
              <div>
                <input
                  value={`$${detalle.precio_unitario}`}
                  className="outline-none h-12 text-2xl px-5 w-full"
                />
              </div>
            </div>
            <div className="space-y-1 w-full">
              <label className="block text-xl font-medium text-[#99a4b6]">
                Subtotal
              </label>
              <div>
                <input
                  value={detalle.subtotal}
                  className="outline-none h-12 text-2xl px-5 w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex items-end w-14 cursor-pointer">
            {saleStore.detalles.length > 1 && (
              <img
                onClick={() => handleDeleteDetail(index)}
                className="h-12"
                src={close.src}
                alt="Close"
              />
            )}
          </div>
        </div>
      ))}

      <div className="w-full grid gap-2">
        <div
          onClick={() => newDetail()}
          className="w-32 h-12 bg-blue-400 text-white text-xl flex items-center justify-center cursor-pointer rounded-sm"
        >
          Add
        </div>
        <div className="w-full flex justify-end md:px-28">
          <div className="space-y-1 flex items-center gap-2 w-[230px]">
            <label className="block text-xl font-medium text-[#99a4b6]">
              Quantity
            </label>
            <div>
              <input
                value={saleStore.sale.monto_total}
                type="number"
                className="outline-none h-12 text-2xl px-5 w-full"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black"></div>
        {general && (
          <p className="text-red-500 text-sm">SELECT CUSTOMER OR BRANCH or select detail</p>
        )}
        <div className="flex justify-end mt-3">
          <div
            onClick={() => saveSale()}
            className="w-32 h-12 bg-blue-400 text-white text-xl flex items-center justify-center cursor-pointer rounded-sm"
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
