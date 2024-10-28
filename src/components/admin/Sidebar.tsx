"use client"
import home from "../../images/Recurso 8.png";
import braily from "../../images/Recurso 9.png";
import rect from "../../images/Recurso 10.png";
import folder from "../../images/Recurso 11.png";
import user from "../../images/Recurso 12.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Sidebar = () => {
  const [navigate, setNavigate] = useState('')
  const router = useRouter()

  useEffect(() => {

      setNavigate(window.location.pathname)
  }, [])
  

  return (
    <div className="h-full w-10 sm:w-16 bg-[#279aff] pt-20">
      <div className="">
        <div onClick={()=>{setNavigate('/admin');router.push('/admin'); }} className={`${navigate==='/admin' && 'bg-blue-500'} cursor-pointer w-full h-16 flex justify-center items-center`}>
          <img src={home.src} alt="" />
        </div>
        <div className=" w-full h-16 flex justify-center items-center">
          <img src={braily.src} alt="" />
        </div>
        <div className=" w-full h-16 flex justify-center items-center">
          <img src={rect.src} alt="" />
        </div>
        <div onClick={()=>{setNavigate('/admin/sales');router.push('/admin/sales'); }} className={`${navigate==='/admin/sales' && 'bg-blue-500'} cursor-pointer w-full h-16 flex justify-center items-center`}>
          <img src={folder.src} alt="" />
        </div>
        <div className=" w-full h-16 flex justify-center items-center">
          <img src={user.src} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar