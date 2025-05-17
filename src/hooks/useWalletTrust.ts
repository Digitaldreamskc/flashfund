import { useConnection } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import { TrustLevel } from '../types'

export const useWalletTrust = (walletAddress?: string) => {
  const { connection } = useConnection()
  const [trustLevel, setTrustLevel] = useState<TrustLevel>('new')

  useEffect(() => {
    const calculateTrustLevel = async () => {
      if (!walletAddress) return

      try {
        const pubkey = new PublicKey(walletAddress)
        const signatures = await connection.getSignaturesForAddress(pubkey, { limit: 100 })
        
        if (signatures.length === 0) {
          setTrustLevel('new')
          return
        }

        const firstTx = signatures[signatures.length - 1]
        const accountAge = (Date.now() - firstTx.blockTime! * 1000) / (1000 * 60 * 60 * 24) // in days
        const txCount = signatures.length
        const txPerDay = txCount / accountAge

        if (txCount >= 50 && accountAge >= 30 && txPerDay >= 1) {
          setTrustLevel('veteran')
        } else if (txCount >= 20 && accountAge >= 15 && txPerDay >= 0.5) {
          setTrustLevel('trusted')
        } else if (txCount >= 5 && accountAge >= 3) {
          setTrustLevel('verified')
        } else {
          setTrustLevel('new')
        }
      } catch (error) {
        console.error('Error calculating trust level:', error)
        setTrustLevel('new')
      }
    }

    calculateTrustLevel()
  }, [walletAddress, connection])

  return { trustLevel }
} 