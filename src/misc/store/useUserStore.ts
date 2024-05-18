import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TSignInResponse } from '../../api-booking/public/auth/signIn'
type TUserStore = {
  user: TSignInResponse | null
  setUserAuth: (user: TSignInResponse) => void
  clearUserAuth: () => void
}
const useUserStore = create<TUserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUserAuth: (user: TSignInResponse) => set({ user }),
        clearUserAuth: () => set(() => ({ user: null })),
      }),
      {
        name: 'auth-storage',
      },
    ),
  ),
)
export default useUserStore
