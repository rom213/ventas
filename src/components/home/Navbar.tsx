"use client"
const Navbar = () => {
  return (
    <header className="fixed h-28 flex justify-end items-center w-full px-20 ">
        <div className="flex space-x-8 font-bold text-xl">
           <span>
                Content 1
           </span>
           <span>
                Content 2
           </span>
           <span className="text-[#279aff] cursor-pointer hover:scale-105 transition-transform">
                Login
           </span>
        </div>
    </header>
  )
}

export default Navbar