import { useState, useMemo } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRequestStore, RequestCategory } from '../store/requestStore'
import DonationModal from './DonationModal'

const CATEGORIES: RequestCategory[] = ['Medical', 'Flood', 'Fire', 'Housing', 'Earthquake', 'Tornado', 'Other']

export default function RequestFeed() {
  const { publicKey } = useWallet()
  const { getActiveRequests, donate } = useRequestStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<RequestCategory | 'All'>('All')
  const [selectedRequest, setSelectedRequest] = useState<{ id: string; amount: number } | null>(null)

  const filteredRequests = useMemo(() => {
    const activeRequests = getActiveRequests()
    return activeRequests.filter((request) => {
      const matchesSearch = searchQuery === '' || 
        request.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'All' || request.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [getActiveRequests, searchQuery, selectedCategory])

  const handleDonate = (requestId: string, amount: number) => {
    donate(requestId, amount)
    setSelectedRequest(null)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
  }

  const renderEmptyState = () => {
    if (getActiveRequests().length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg mb-2">No active emergency requests found.</p>
          <p>Be the first to create one!</p>
        </div>
      )
    }

    return (
      <div className="text-center text-gray-500 py-8">
        <p className="text-lg mb-2">No matching requests found.</p>
        <p className="mb-4">Try a different category or search term.</p>
        <button
          onClick={handleResetFilters}
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Reset Filters
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Active Requests</h2>
        {selectedCategory !== 'All' && (
          <button
            onClick={handleResetFilters}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Reset Filters
          </button>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by location or message..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as RequestCategory | 'All')}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredRequests.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">
                      {request.walletAddress === publicKey?.toString()
                        ? 'You'
                        : `${request.walletAddress.slice(0, 4)}...${request.walletAddress.slice(-4)}`}
                    </p>
                    {request.isVerified && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-semibold mt-1">
                    {request.amount} USDC
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRequest({ id: request.id, amount: 1 })}
                  disabled={request.walletAddress === publicKey?.toString()}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    request.walletAddress === publicKey?.toString()
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Donate
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                  {request.category}
                </span>
                <span className="text-sm text-gray-500">
                  {request.location}
                </span>
              </div>
              
              <p className="text-gray-700">{request.message}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xs text-gray-400">
                  {new Date(request.timestamp).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">
                  Expires in {Math.ceil((48 * 60 * 60 * 1000 - (Date.now() - request.timestamp)) / (60 * 60 * 1000))} hours
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRequest && (
        <DonationModal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          requestId={selectedRequest.id}
          amount={selectedRequest.amount}
          onConfirm={handleDonate}
        />
      )}
    </div>
  )
} 