import React, { useRef } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import RequestForm from './components/RequestForm'
import RequestFeed from './components/RequestFeed'
import Dashboard from './components/Dashboard'

export default function App() {
  const { connected } = useWallet()
  const feedRef = useRef<HTMLDivElement>(null)

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!connected) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">FlashFund</h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect your wallet to start helping others in need
            </p>
            <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">FlashFund</h1>
          <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700" />
        </div>

        <Dashboard onCategoryClick={scrollToFeed} />
        <RequestForm />
        
        <div ref={feedRef}>
          <RequestFeed />
        </div>
      </div>
    </div>
  )
}

