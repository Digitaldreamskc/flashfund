import { create } from 'zustand'

export type RequestCategory = 'Medical' | 'Flood' | 'Fire' | 'Housing' | 'Earthquake' | 'Tornado' | 'Other'

// Simulated list of verified wallets
export const VERIFIED_WALLETS = [
  'YourWalletAddress1',
  'YourWalletAddress2',
  // Add more verified wallets here
]

export interface EmergencyRequest {
  id: string
  walletAddress: string
  amount: number
  message: string
  location: string
  category: RequestCategory
  timestamp: number
  isVerified: boolean
}

interface RequestStore {
  requests: EmergencyRequest[]
  addRequest: (request: Omit<EmergencyRequest, 'id' | 'timestamp' | 'isVerified'>) => { success: boolean; error?: string }
  donate: (requestId: string, amount: number) => void
  getRequestsByWallet: (walletAddress: string) => EmergencyRequest[]
  hasActiveRequest: (walletAddress: string) => boolean
  isDuplicateRequest: (walletAddress: string, message: string) => boolean
  getActiveRequests: () => EmergencyRequest[]
  isRequestExpired: (timestamp: number) => boolean
}

const EXPIRATION_WINDOW = 48 * 60 * 60 * 1000 // 48 hours in milliseconds

export const useRequestStore = create<RequestStore>((set, get) => ({
  requests: [],
  addRequest: (request) => {
    const state = get()
    
    // Check for duplicate request
    if (state.isDuplicateRequest(request.walletAddress, request.message)) {
      return { success: false, error: 'You have already submitted this exact request' }
    }
    
    // Check for active request
    if (state.hasActiveRequest(request.walletAddress)) {
      return { success: false, error: 'You already have an active request' }
    }

    set((state) => ({
      requests: [
        {
          ...request,
          id: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
          isVerified: VERIFIED_WALLETS.includes(request.walletAddress),
        },
        ...state.requests,
      ],
    }))
    
    return { success: true }
  },
  donate: (requestId, amount) => set((state) => ({
    requests: state.requests.map((request) =>
      request.id === requestId
        ? { ...request, amount: request.amount + amount }
        : request
    ),
  })),
  getRequestsByWallet: (walletAddress) => {
    return get().requests.filter(request => request.walletAddress === walletAddress)
  },
  hasActiveRequest: (walletAddress) => {
    return get().requests.some(request => 
      request.walletAddress === walletAddress && !get().isRequestExpired(request.timestamp)
    )
  },
  isDuplicateRequest: (walletAddress, message) => {
    return get().requests.some(
      request => request.walletAddress === walletAddress && request.message === message
    )
  },
  getActiveRequests: () => {
    return get().requests.filter(request => !get().isRequestExpired(request.timestamp))
  },
  isRequestExpired: (timestamp) => {
    return Date.now() - timestamp > EXPIRATION_WINDOW
  }
})) 