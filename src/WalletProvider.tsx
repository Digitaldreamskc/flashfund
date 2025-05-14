// src/WalletProvider.tsx
import { type ReactNode, useMemo } from 'react'
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import type { WalletError } from '@solana/wallet-adapter-base'

// Import wallet adapters that aren't auto-injected
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'

import '@solana/wallet-adapter-react-ui/styles.css'

interface Props {
  children: ReactNode
}

export default function WalletProviderWrapper({ children }: Props) {
  // Use devnet for development
  const endpoint = useMemo(() => clusterApiUrl('devnet'), [])
  
  // Only include wallets that aren't auto-injected
  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider 
        wallets={wallets} 
        autoConnect={true}
        onError={(error: WalletError) => {
          console.error('Wallet connection error:', error)
        }}
      >
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}
