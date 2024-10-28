"use client";

import { ChangeEvent, useEffect, useState } from "react";
import plus from "../../../images/Recurso 13.png";
import { Customer } from "@/types/customer";
import { CustomerStore } from "@/store/customer";
import { SaleStore } from "@/store/sale";
import { Branch } from "@/types/branch";
import { BranchStore } from "@/store/branch";

const Document = () => {
  const [keyCustomer, setkeyCustomer] = useState("");
  const [device, setDevice] = useState("");

  const [customers, setCustomers] = useState<Customer[] | []>();
  const customerStore = CustomerStore();
  const saleStore = SaleStore();
  const branchStore = BranchStore();

  useEffect(() => {
    if (keyCustomer !== "") {
      customerStore.findUsers(keyCustomer);
      setCustomers(customerStore.users);
    }
  }, [keyCustomer]);

  useEffect(() => {
    branchStore.allBranches();
  }, []);


  const onChangeSelectDevice = (e:ChangeEvent<HTMLSelectElement>) => {
    const selectedBranch = branchStore.branches.find(
      (branch) => branch.pais === e.target.value
    );
    

    if (selectedBranch) {
      saleStore.sale.sucursal_id=selectedBranch.id
      saleStore.sale.moneda=selectedBranch?.moneda
      saleStore.sale.nombre_suscursal=selectedBranch.pais
      setDevice(selectedBranch.moneda);

    }
  };

  const onClickCustomer = (customer: Customer) => {
    setkeyCustomer(customer.nombre + " " + customer.apellidos);
    const timeStamp = new Date();
    saleStore.sale.fecha = timeStamp.toString();
    saleStore.sale.cliente_id = customer.id;
  };

  return (
    <div className="space-y-2">
      <div className="space-y-3">
        <div>
          <h3 className="text-4xl font-semibold">Document</h3>
        </div>
        <div className="w-full h-[0.1px] bg-black"></div>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-10">
        <div className="col-start-1 col-end-4 flex justify-between gap-2 sm:gap-10 flex-col sm:flex-row">
          <div className="space-y-2 w-full relative">
            <label className="block sm:text-xl font-medium text-[#99a4b6]">
              Client
            </label>
            <div className="flex gap-2 ">
              <input
                value={keyCustomer}
                className="outline-none h-12 text-2xl px-3 w-full"
                onChange={(e) => {
                  setkeyCustomer(e.target.value);
                  saleStore.sale.cliente_id = 0;
                  saleStore.sale.sucursal_id=0;
                }}
              />
              <img className="w-12" src={plus.src} alt="" />
            </div>
            {keyCustomer !== "" && saleStore.sale.cliente_id === 0 && (
              <div className="z-50 w-full bg-[#279aff] absolute max-h-[300px] overflow-auto rounded-b-lg">
                {customers?.length === 0 && (
                  <div className="w-full text-center text-white">
                    Not found customer
                  </div>
                )}
                {customers?.length !== 0 && (
                  <div className="grid gap-[1px] text-2x ">
                    {customers?.map((customer) => (
                      <div
                        onClick={() => onClickCustomer(customer)}
                        key={customer.id}
                        className="h-12 bg-white cursor-pointer hover:bg-[#279aff] transition-all hover:text-white text-2xl flex items-center px-3"
                      >
                        <div>{customer.nombre + " " + customer.apellidos}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="space-y-2 w-full">
            <label className="block sm:text-xl font-medium text-[#99a4b6]">
              Branch office
            </label>
            <div>
              <select
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                onChange={(e) =>onChangeSelectDevice(e)}
              >
                <option value="" disabled selected>
                  Choose countries
                </option>
                {branchStore.branches.map((branch) => (
                  <option key={branch.id} value={branch.pais}>
                    {branch.pais}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          <div className="space-y-2 w-full">
            <label className="block sm:text-xl font-medium text-[#99a4b6]">
              Currency
            </label>
            <div>
              <input
                value={device}
                className="outline-none h-12 text-2xl px-5 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
