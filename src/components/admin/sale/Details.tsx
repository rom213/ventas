"use client";

import { useEffect, useState } from "react";
import close from "../../../images/Recurso 15.png";
import { SaleStore } from "@/store/sale";
import { ProductStore } from "@/store/product";
import { Product } from "@/types/product";

const Details = () => {
  const saleStore = SaleStore();
  const productStore = ProductStore();

  const [searchKey, setSearchKey] = useState("");
  const [render, setRender] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null);

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
      };
    }
    setSearchKey("");
  };



  const mathPriceForDetail=(quantity:string, index:number)=>{
    saleStore.detalles[index] = {
      ...saleStore.detalles[index],
      cantidad:Number(quantity),
      subtotal:Number(quantity)*saleStore.detalles[index].precio_unitario
    };
    setRender(render+1)
  }

  const handleDeleteDetail = (index: number) => {
    if (saleStore.detalles.length>1) {
        saleStore.detalles.splice(index, 1);
    }

    setRender(render+1)
  };
  

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
                  value={detalle.nombre_producto || ""}
                  onChange={(e) => {
                    setSearchKey(e.target.value);
                    if (e.target.value !== "") setActiveDetailIndex(index);
                  }}
                  className="outline-none h-12 text-2xl px-5 w-full"
                />
              </div>
              {searchKey !== "" && activeDetailIndex === index && (
                <div className="w-full bg-[#279aff] absolute max-h-[300px] overflow-auto rounded-b-lg">
                  {products.length === 0 && (
                    <div className="w-full text-center text-white">
                      Not found product
                    </div>
                  )}
                  {products.length !== 0 && (
                    <div className="grid gap-[1px] text-2x ">
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
                <input onChange={(e)=>{mathPriceForDetail(e.target.value, index)}} type="number"  className="outline-none h-12 text-2xl px-5 w-full" />
              </div>
            </div>
            <div className="space-y-1 w-full">
              <label className="block text-xl font-medium text-[#99a4b6]">
                Price
              </label>
              <div>
                <input value={`$${detalle.precio_unitario}`} className="outline-none h-12 text-2xl px-5 w-full" />
              </div>
            </div>
            <div className="space-y-1 w-full">
              <label className="block text-xl font-medium text-[#99a4b6]">
                Subtotal
              </label>
              <div>
                <input value={detalle.subtotal} className="outline-none h-12 text-2xl px-5 w-full" />
              </div>
            </div>
          </div>
          <div className="flex items-end w-14 cursor-pointer">
              {
                saleStore.detalles.length>1 &&   <img onClick={()=>handleDeleteDetail(index)} className="h-12" src={close.src} alt="Close" />
              }

          </div>
        </div>
      ))}
    </div>
  );
};

export default Details;
