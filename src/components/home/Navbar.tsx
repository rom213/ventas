"use client"

import { LoginStore } from "@/store/user"
import { useRouter } from "next/navigation"



const Navbar = () => {
  const loginStore=LoginStore()
  const router=useRouter()

  const hadleNavigation=()=>{
     if (loginStore.isLoggedIn) {
          router.push('/admin')  
          return        
    }
     loginStore.showLogin()
  }
  return (
    <header className="fixed h-28 flex justify-end items-center w-full px-10 lg:px-20 z-20">
        <div className="flex space-x-8 font-bold text-xl">
           <span>
                Content 1
           </span>
           <span>
                Content 2
           </span>
           <span onClick={hadleNavigation} className="text-[#279aff] cursor-pointer hover:scale-105 transition-transform">
                Login
           </span>
        </div>
    </header>
  )
}

export default Navbar