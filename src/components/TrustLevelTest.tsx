import { useState } from 'react'
import { useWalletTrust } from '../hooks/useWalletTrust'
import CredibilityBadge from './CredibilityBadge'

const TrustLevelTest = () => {
  const [selectedWallet, setSelectedWallet] = useState<string>('')
  const { trustLevel } = useWalletTrust(selectedWallet)

  return (
    <div className="p-4 bg-solana-card-bg/40 rounded-xl">
      <h2 className="text-xl font-heading font-semibold mb-4">Wallet Trust Level Test</h2>
      <input
        type="text"
        value={selectedWallet}
        onChange={(e) => setSelectedWallet(e.target.value)}
        placeholder="Enter wallet address to test"
        className="w-full px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light focus:outline-none focus:ring-2 focus:ring-solana-accent mb-4"
      />
      {selectedWallet && (
        <div className="flex items-center gap-2">
          <span className="text-solana-text-light/80">Trust Level:</span>
          <CredibilityBadge trustLevel={trustLevel} />
        </div>
      )}
    </div>
  )
}

export default TrustLevelTest 