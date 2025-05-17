import { Request } from '../types'

interface RequestCardProps {
  request: Request
}

export default function RequestCard({ request }: RequestCardProps) {
  return (
    <div className="bg-solana-card-bg/60 rounded-xl p-6 shadow-lg border border-solana-accent/20 hover:border-solana-accent/40 transition-colors">
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
  )
} 