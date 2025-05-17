import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function Header() {
  return (
    <header className="bg-solana-card-bg/80 backdrop-blur-sm border-b border-solana-accent/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-solana-primary via-solana-secondary to-solana-accent bg-clip-text text-transparent animate-pulse-glow">
            FlashFund
          </h1>
          <WalletMultiButton className="!bg-solana-card-bg !text-solana-text-light hover:!bg-solana-card-bg/80" />
        </div>
      </div>
    </header>
  )
} 