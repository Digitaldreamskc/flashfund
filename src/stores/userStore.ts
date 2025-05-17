import { create } from 'zustand'

export type UserRole = 'donor' | 'requester'

export interface SupportedRequest {
  requestId: string
  title: string
  amount: number
  category: string
  date: string
}

interface UserStore {
  userRole: UserRole | null
  setUserRole: (role: UserRole) => void
  clearUserRole: () => void
  supportedRequests: SupportedRequest[]
  addSupportedRequest: (req: SupportedRequest) => void
  getTotalDonated: () => number
}

const getInitialRole = (): UserRole | null => {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('userRole') as UserRole) || null
  }
  return null
}

const getInitialSupported = (): SupportedRequest[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('supportedRequests')
    return data ? JSON.parse(data) : []
  }
  return []
}

export const useUserStore = create<UserStore>((set, get) => ({
  userRole: getInitialRole(),
  setUserRole: (role) => {
    set({ userRole: role })
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role)
    }
  },
  clearUserRole: () => {
    set({ userRole: null })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole')
    }
  },
  supportedRequests: getInitialSupported(),
  addSupportedRequest: (req) => {
    set((state) => {
      const updated = [...state.supportedRequests, req]
      if (typeof window !== 'undefined') {
        localStorage.setItem('supportedRequests', JSON.stringify(updated))
      }
      return { supportedRequests: updated }
    })
  },
  getTotalDonated: () => {
    return get().supportedRequests.reduce((sum, r) => sum + r.amount, 0)
  },
})) 