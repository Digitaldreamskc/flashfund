import { useRequestStore } from '../stores/requestStore'
import { useEffect, useState } from 'react'

export default function RequestFeed() {
  const requests = useRequestStore(state => state.requests)
  const addRequest = useRequestStore(state => state.addRequest)
  const [search, setSearch] = useState('')

  // Always add a mock request for testing if feed is empty
  useEffect(() => {
    if (requests.length === 0) {
      addRequest({
        id: 'mock1',
        title: 'Tornado Relief in Kansas',
        description: 'Urgent help needed after tornado damage.',
        amount: 5,
        category: 'Tornado',
        location: 'Kansas, USA',
        requester: 'abcd...1234',
        requesterWallet: 'FAKE_WALLET_ADDRESS',
        timestamp: Date.now(),
        status: 'active',
        donations: [],
        imageUrl: null,
      })
    }
  }, [requests, addRequest])

  const sortedRequests = [...requests]

  // Filter requests by search (state/disaster type)
  const filteredRequests = sortedRequests.filter(req => {
    const q = search.toLowerCase()
    return (
      req.title.toLowerCase().includes(q) ||
      req.category.toLowerCase().includes(q) ||
      (req.location?.toLowerCase().includes(q) ?? false)
    )
  })

  return (
    <div className="w-full">
      <h2 className="text-2xl font-heading font-semibold mb-6 text-center">Emergency Requests</h2>
      <div className="space-y-6">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12 bg-solana-card-bg/40 rounded-xl">
            <p className="text-solana-text-light/60">
              No emergency requests found.
            </p>
          </div>
        ) : (
          filteredRequests.map(request => (
            <div
              key={request.id}
              className="bg-solana-card-bg/60 rounded-xl p-6 shadow-lg border border-solana-accent/20 hover:border-solana-accent/40 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-heading font-semibold">{request.title}</h3>
                <span className="px-3 py-1 rounded-full text-sm bg-solana-primary/10 text-solana-primary">
                  {request.category}
                </span>
              </div>
              <p className="text-solana-text-light/80 mb-4">{request.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-solana-secondary font-medium">
                  {request.amount} SOL needed
                </div>
                <div className="text-sm text-solana-text-light/60">
                  Requested by {request.requester}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <input
        type="text"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        placeholder="Search by state, region, or disaster type..."
        className="px-4 py-2 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light focus:outline-none focus:ring-2 focus:ring-solana-accent w-full md:w-80"
      />
    </div>
  )
} 