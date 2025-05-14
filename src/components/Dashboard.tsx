import { useRequestStore, RequestCategory } from '../store/requestStore'

interface DashboardProps {
  onCategoryClick: () => void
}

export default function Dashboard({ onCategoryClick }: DashboardProps) {
  const { getActiveRequests } = useRequestStore()
  const requests = getActiveRequests()

  const categoryCounts = requests.reduce((acc, request) => {
    acc[request.category] = (acc[request.category] || 0) + 1
    return acc
  }, {} as Record<RequestCategory, number>)

  const totalAmount = requests.reduce((sum, request) => sum + request.amount, 0)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Total Active Requests</h3>
          <p className="text-3xl font-bold text-indigo-600">{requests.length}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Total Amount Requested</h3>
          <p className="text-3xl font-bold text-indigo-600">{totalAmount} USDC</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Requests by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <button
              key={category}
              onClick={() => {
                onCategoryClick()
                // We'll handle the category filter in RequestFeed
              }}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition-colors"
            >
              <p className="text-sm text-gray-500">{category}</p>
              <p className="text-xl font-bold text-indigo-600">{count}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 