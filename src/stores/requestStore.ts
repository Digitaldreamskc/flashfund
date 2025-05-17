import { create } from 'zustand'
import { Request } from '../types'

interface RequestStore {
  requests: Request[]
  addRequest: (request: Request) => void
  updateRequest: (id: string, updates: Partial<Request>) => void
  deleteRequest: (id: string) => void
  addDonation: (requestId: string, donation: { donor: string; amount: number; timestamp: number }) => void
}

export const useRequestStore = create<RequestStore>((set) => ({
  requests: [],
  addRequest: (request) => set((state) => ({
    requests: [...state.requests, request]
  })),
  updateRequest: (id, updates) => set((state) => ({
    requests: state.requests.map((request) =>
      request.id === id ? { ...request, ...updates } : request
    )
  })),
  deleteRequest: (id) => set((state) => ({
    requests: state.requests.filter((request) => request.id !== id)
  })),
  addDonation: (requestId, donation) => set((state) => ({
    requests: state.requests.map((request) =>
      request.id === requestId
        ? { ...request, donations: [...(request.donations || []), donation] }
        : request
    )
  })),
})) 