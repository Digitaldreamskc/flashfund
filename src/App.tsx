import { useRef } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import RequestForm from './components/RequestForm'
import RequestFeed from './components/RequestFeed'
import Dashboard from './components/Dashboard'

export function App() {
  const { connected } = useWallet()
  const scrollRef = useRef<HTMLDivElement>(null)

  if (!connected) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">FlashFund</h1>
          <p className="text-lg text-gray-600 mb-8">Connect your wallet to get started</p>
          <WalletMultiButton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">FlashFund</h1>
            </div>
            <div className="flex items-center">
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Dashboard onCategoryClick={() => {
                scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
              }} />
              <div ref={scrollRef} className="mt-6">
                <RequestFeed />
              </div>
            </div>
            <div>
              <RequestForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

