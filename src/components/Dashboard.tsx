import { useRequestStore } from '../stores/requestStore'

interface DashboardProps {
  onCategoryClick: (category: string) => void
}

export default function Dashboard({ onCategoryClick }: DashboardProps) {
  const requests = useRequestStore(state => state.requests)

  const totalActiveRequests = requests.length
  const totalAmountRequested = requests.reduce((sum, request) => sum + request.amount, 0)

  const categoryCounts = requests.reduce((acc, request) => {
    acc[request.category] = (acc[request.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div>
      <h2 className="text-2xl font-heading font-semibold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-solana-card-bg/60 rounded-xl p-4 border border-solana-accent/20">
          <h3 className="text-sm font-medium text-solana-text-light/60 mb-1">Total Active Requests</h3>
          <p className="text-2xl font-heading font-semibold text-solana-primary">{totalActiveRequests}</p>
        </div>
        <div className="bg-solana-card-bg/60 rounded-xl p-4 border border-solana-accent/20">
          <h3 className="text-sm font-medium text-solana-text-light/60 mb-1">Total Amount Requested</h3>
          <p className="text-2xl font-heading font-semibold text-solana-secondary">{totalAmountRequested} SOL</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-heading font-semibold mb-4">Requests by Category</h3>
        <div className="space-y-2">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className="w-full flex justify-between items-center p-3 rounded-lg bg-solana-card-bg/60 border border-solana-accent/20 hover:bg-solana-card-bg transition-colors"
            >
              <span className="font-medium">{category}</span>
              <span className="text-solana-accent">{count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 