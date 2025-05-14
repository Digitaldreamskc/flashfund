import { WalletProviderWrapper } from './WalletProvider'
import RequestForm from './components/RequestForm'
import RequestFeed from './components/RequestFeed'
import Dashboard from './components/Dashboard'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useRef } from 'react'

function App() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <WalletProviderWrapper>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Futuristic Header */}
        <header className="relative h-24">
          <div className="header-bg" />
          <div className="circuit-lines" />
          <div className="glow-line" style={{ top: '30%' }} />
          <div className="glow-line" style={{ top: '70%' }} />
          
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-between">
            <h1 className="text-4xl font-futuristic tracking-wide animate-glow">
              FlashFund
            </h1>
            <WalletMultiButton className="!bg-cyan-600 hover:!bg-cyan-500 transition-colors" />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
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
    </WalletProviderWrapper>
  )
}

export default App

