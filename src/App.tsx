import { WalletProviderWrapper } from './WalletProvider'
import RequestForm from './components/RequestForm'
import RequestFeed from './components/RequestFeed'
import Dashboard from './components/Dashboard'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useRef } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

function App() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { publicKey } = useWallet()

  return (
    <WalletProviderWrapper>
      <div className="min-h-screen bg-gray-900 text-white">
        {!publicKey ? (
          // Hero Section (Before Wallet Connection)
          <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            
            {/* Glowing Lines */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-glow-line" />
              <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-glow-line delay-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 animate-glow">
                FlashFund
              </h1>
              <p className="text-2xl md:text-3xl font-orbitron font-medium mb-8 text-gray-200">
                Fast Aid, Real People, Transparent Impact
              </p>
              <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Share urgent needs. Rally real support. Every request is tracked, every response visible.
              </p>
              <div className="animate-fade-in">
                <WalletMultiButton className="!bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 !text-white !font-medium !px-8 !py-3 !rounded-lg !shadow-lg hover:!shadow-xl transition-all duration-300" />
              </div>
            </div>
          </div>
        ) : (
          // Main App Content (After Wallet Connection)
          <div className="relative z-10 bg-gray-900">
            {/* Animated Divider */}
            <div className="relative h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-glow-line mb-8" />
            
            <main className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <RequestForm />
                  <div ref={scrollRef}>
                    <RequestFeed />
                  </div>
                </div>
                <div>
                  <Dashboard onCategoryClick={() => {
                    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }} />
                </div>
              </div>
            </main>
          </div>
        )}
      </div>
    </WalletProviderWrapper>
  )
}

export default App

