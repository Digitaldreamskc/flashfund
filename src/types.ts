export type RequestCategory =
  | 'Fire'
  | 'Medical'
  | 'Housing'
  | 'Tornado'
  | 'Earthquake'
  | 'Flood'
  | 'Other'

export type TrustLevel = 'veteran' | 'trusted' | 'verified' | 'new'

export interface Request {
  id: string
  title: string
  description: string
  amount: number
  category: RequestCategory
  location: string
  requester: string
  requesterWallet: string
  timestamp: number
  status: 'active' | 'completed' | 'cancelled'
  donations: Array<{
    amount: number
    donor: string
    timestamp: number
  }>
  imageUrl: string | null
  trustLevel?: TrustLevel
}

export interface Donation {
  amount: number
  donor: string
  timestamp: number
} 