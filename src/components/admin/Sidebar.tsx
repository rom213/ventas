"use client";
import home from "../../images/Recurso 8.png";
import braily from "../../images/Recurso 9.png";
import rect from "../../images/Recurso 10.png";
import folder from "../../images/Recurso 11.png";
import user from "../../images/Recurso 12.png";
import close from "../../images/close.png";
import avatar from "../../images/avatar.png";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginStore } from "@/store/user";
const Sidebar = () => {
  const [navigate, setNavigate] = useState("");
  const router = useRouter();
  const loginStorage=LoginStore()

  useEffect(() => {
    const isLogin=localStorage.getItem('login')
    console.log(isLogin);
  }, []);

  const hadleLogout=()=>{
    localStorage.removeItem('login')
    router.push('/')
  }

  return (
    <div className="h-full w-10 sm:w-16 bg-[#279aff] pt-20">
      <div className="">
        <div
          onClick={() => {
            setNavigate("/admin");
            router.push("/admin");
          }}
          className={`${
            navigate === "/admin" && "bg-blue-500"
          } cursor-pointer w-full h-16 flex justify-center items-center`}
        >
          <img src={home.src} alt="" />
        </div>
        <div className=" w-full h-16 flex justify-center items-center">
          <img src={braily.src} alt="" />
        </div>
        <div className=" w-full h-16 flex justify-center items-center">
          <img src={rect.src} alt="" />
        </div>
        <div
          onClick={() => {
            setNavigate("/admin/sales");
            router.push("/admin/sales");
          }}
          className={`${
            navigate === "/admin/sales" && "bg-blue-500"
          } cursor-pointer w-full h-16 flex justify-center items-center`}
        >
          <img src={folder.src} alt="" />
        </div>
        <div className="cursor-pointer group relative">
          <div className=" w-full h-16 flex justify-center items-center">
            <img src={user.src} alt="" />
          </div>

          <div className="w-[400px] max-w-xs md:max-w-md lg:max-w-lg p-2.5 bg-white shadow justify-start items-start gap-2.5 inline-flex absolute left-10 sm:left-16 top-0 hidden group-hover:block z-10">
            <div className="flex w-full h-[81px] px-2.5 justify-start items-center">
              <img
                className="h-16 md:h-20 lg:h-24 rounded-full"
                src={avatar.src}
                alt="Avatar"
              />

              <div className="flex-1 flex-col justify-start items-start ml-2.5">
                <div className="w-full flex items-center">
                  <div className="text-black text-lg md:text-xl font-normal font-['Inter']">
                    Welcome admin
                  </div>
                </div>
                <div className="flex flex-col mt-1">
                  <div className="text-black text-sm md:text-base font-thin font-['Inter']">
                    Marco Salazar
                  </div>
                  <div className="text-black text-xs md:text-sm font-thin font-['Inter'] mt-1">
                    admin@admin.com
                  </div>
                </div>
              </div>
              <button onClick={()=>{hadleLogout()}} className="h-10 w-10 md:h-12 md:w-12 p-2.5 flex justify-center items-center">
                <img className="h-full" src={close.src} alt="Close" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
