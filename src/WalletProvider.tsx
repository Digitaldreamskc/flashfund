// src/WalletProvider.tsx
import { type ReactNode, useMemo } from 'react'
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import '@solana/wallet-adapter-react-ui/styles.css'

interface Props {
  children: ReactNode
}

export function WalletProviderWrapper({ children }: Props) {
  const endpoint = useMemo(() => clusterApiUrl('devnet'), [])
  const wallets = useMemo(() => [], []) // Empty array since Solflare is auto-injected

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}
