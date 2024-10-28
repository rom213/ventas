"use client"

import { LoginStore } from '@/store/user'
import image from '../../images/Recurso_3.png'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'




const SectionMajor = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter()

    useEffect(() => {
        loginStore.verifyLogged()
    }, [])

    const hadleNavigation=()=>{
        if (loginStore.isLoggedIn) {
             router.push('/admin')  
             return        
       }
        loginStore.showLogin()
     }
    
  
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();


      if (email=='admin@admin.com' && password==='admin') {
            router.push('/admin')
            localStorage.setItem('login','true')
            loginStore.showLogin()
            return
      }
      setError(true)
      setEmail('')
      setPassword('')
    };
  
    const loginStore = LoginStore()
    
    return (
        <div className=''>
            <div className="p-2 sm:p-8 lg:p-36">
                <div className="space-y-20">
                    {
                        loginStore.login ?
                            <>
                                <div className=''>
                                    <form onSubmit={handleSubmit} className="space-y-6 w-[400px] scale-110">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Correo electrónico
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="ejemplo@correo.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Contraseña
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="********"
                                            />
                                        </div>
                                        {
                                            error &&
                                            <span className='text-red-400 absolute bottom-12'>contrasena o correo equivocado</span>
                                        }

                                        <button
                                            type="submit"
                                            className="w-full px-4 py-2 font-semibold text-white bg-[#279aff] rounded-lg hover:bg-[#64b3f9] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Iniciar Sesión
                                        </button>
                                    </form>
                                </div>
                            </> :
                            <>
                                <div className="flex flex-col space-y-8 md:w-[440px]">
                                    <h2 className=" text-4xl md:text-6xl font-extrabold">
                                        <span>Lorem, ipsum</span>
                                        <span className="block">Design.</span>
                                    </h2>
                                    <p className='text-xl text-[#99a4b6] font-semibold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                        labore et dolore magna aliqua</p>
                                </div>
                                <button onClick={hadleNavigation} className="bg-[#279aff] text-white p-2 px-4 lg:p-3 lg:px-6 rounded-sm text-2xl lg:text-3xl font-bold hover:scale-110 transition-all">LOGIN</button>

                            </>
                    }

                </div>
            </div>
            <div>
                <img className="absolute md:max-w-[66%] top-0 right-0 -z-10" src={image.src} />
            </div>

            <div>
            </div>
        </div>
    )
}

export default SectionMajor