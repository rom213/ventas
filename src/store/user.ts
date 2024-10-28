import { create } from 'zustand'

interface LoginStore{
    isLoggedIn:boolean,
    login:boolean;
    showLogin:()=>void;
    verifyLogged:()=>void
}

export const LoginStore = create<LoginStore>((set) => ({
  isLoggedIn:false,
  login: false,
  showLogin: () => set((state) => ({ login: !state.login })),

  verifyLogged: () => set((state) => {
    const isLoggedIn = !!localStorage.getItem('login');

    return { ...state, isLoggedIn};
  })
  

}))